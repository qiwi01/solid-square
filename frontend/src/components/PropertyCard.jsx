import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PropertyCard.css';

const PropertyCard = ({ property }) => (
  <div className="card">
    <img src={property.images[0] || 'placeholder.jpg'} alt={property.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
    <h3>{property.title}</h3>
    <p>{property.location} - {property.bedrooms} Beds - {property.price.toLocaleString()} NGN</p>
    <Link to={`/properties/${property._id}`}><button>View Details</button></Link>
  </div>
);

export default PropertyCard;