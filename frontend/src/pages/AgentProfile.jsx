import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import "../styles/AgentProfile.css";

const AgentProfile = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    axios.get(`/api/agents/${id}`).then(res => setAgent(res.data));
  }, [id]);

  if (!agent) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{agent.name}</h1>
      <p>{agent.bio}</p>
      <p>Rating: {agent.rating} / 5</p>
      <p>Contact: {agent.contact.phone} | {agent.contact.email}</p>
      <button><a href={`https://wa.me/${agent.contact.whatsapp}`}>WhatsApp</a></button>

      {/* Email Form */}
      <form>
        <textarea placeholder="Message" />
        <button>Send Email</button> {/* Use Nodemailer backend */}
      </form>

      {/* Listings */}
      <h2>Listings</h2>
      <div className="grid">
        {agent.listings.map(prop => <PropertyCard key={prop._id} property={prop} />)}
      </div>

      {/* Portfolio */}
      <h2>Portfolio</h2>
      <ul>
        {agent.portfolio.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
};

export default AgentProfile;