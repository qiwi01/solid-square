import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import { AuthContext } from '../context/AuthContext';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('/api/users/favorites').then(res => setFavorites(res.data));
    axios.get('/api/enquiries').then(res => setEnquiries(res.data)); // User-specific
    // Notifications: Fetch or poll
  }, []);

  return (
    <div className="container">
      <h1>{user.name}'s Profile</h1>

      {/* Profile Settings */}
      <section>
        <h2>Settings</h2>
        <form>
          <input placeholder="Name" defaultValue={user.name} />
          <input type="email" placeholder="Email" defaultValue={user.email} />
          <button>Update</button>
        </form>
      </section>

      {/* Favorites */}
      <section>
        <h2>Favorites</h2>
        <div className="grid">
          {favorites.map(prop => <PropertyCard key={prop._id} property={prop} />)}
        </div>
      </section>

      {/* Enquiries */}
      <section>
        <h2>Enquiries</h2>
        <ul>
          {enquiries.map(enq => <li key={enq._id}>{enq.message} for Property {enq.propertyId}</li>)}
        </ul>
      </section>

      {/* Notifications */}
      <section>
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notif, i) => <li key={i}>{notif}</li>)}
        </ul>
      </section>
    </div>
  );
};

export default UserProfile;