import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/AdminDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [analytics, setAnalytics] = useState({ totalProperties: 0, totalVisits: 0 });

  useEffect(() => {
    // Fetch all data
    axios.get('/api/properties').then(res => setProperties(res.data));
    axios.get('/api/agents').then(res => setAgents(res.data));
    axios.get('/api/users').then(res => setUsers(res.data));
    axios.get('/api/blog').then(res => setPosts(res.data));
    axios.get('/api/enquiries').then(res => setEnquiries(res.data));
    // Analytics: Assume /api/analytics endpoint
    axios.get('/api/analytics').then(res => setAnalytics(res.data));
  }, []);

  const handleAddProperty = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post('/api/properties', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  };

  // Similar for edit/delete, manage others

  const chartData = {
    labels: ['Properties', 'Visits', 'Leads'],
    datasets: [{ label: 'Analytics', data: [analytics.totalProperties, analytics.totalVisits, enquiries.length], backgroundColor: 'var(--accent)' }]
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {/* Analytics */}
      <section>
        <h2>Analytics</h2>
        <Bar data={chartData} />
        <p>Total Properties: {analytics.totalProperties}</p>
        <p>Total Visits: {analytics.totalVisits}</p>
        <p>Leads: {enquiries.length}</p>
      </section>

      {/* Add Property */}
      <section>
        <h2>Add Property</h2>
        <form onSubmit={handleAddProperty}>
          <input name="title" placeholder="Title" required />
          <textarea name="description" placeholder="Description" required />
          <input name="price" type="number" placeholder="Price" required />
          <input name="location" placeholder="Location" required />
          <input name="bedrooms" type="number" placeholder="Bedrooms" required />
          <input name="type" placeholder="Type" required />
          <select name="furnished">
            <option value="false">Unfurnished</option>
            <option value="true">Furnished</option>
          </select>
          <select name="rentSale">
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
          <input name="video" placeholder="Video URL" />
          <input name="lat" type="number" placeholder="Latitude" />
          <input name="lng" type="number" placeholder="Longitude" />
          <input name="agentId" placeholder="Agent ID" required />
          <input type="file" name="images" multiple />
          <button type="submit">Add</button>
        </form>
      </section>

      {/* Manage Properties */}
      <section>
        <h2>Manage Properties</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr><th>Title</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {properties.map(prop => (
              <tr key={prop._id}>
                <td>{prop.title}</td>
                <td>{prop.status}</td>
                <td>
                  <button onClick={() => {/* Edit */}}>Edit</button>
                  <button onClick={() => axios.delete(`/api/properties/${prop._id}`)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Similar sections for Agents, Users, Blog, Messages */}
      <section>
        <h2>Message Inbox</h2>
        <ul>
          {enquiries.map(enq => <li key={enq._id}>{enq.message} - From User {enq.userId}</li>)}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;