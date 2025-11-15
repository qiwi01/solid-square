import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageGallery from '../components/ImageGallery';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'; // For map
import { AuthContext } from '../context/AuthContext';
import '../styles/PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [enquiry, setEnquiry] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/api/properties/${id}`).then(res => setProperty(res.data));
  }, [id]);

  const handleFavorite = () => {
    if (user) axios.post('/api/users/favorites', { propertyId: id });
  };

  const handleEnquiry = (e) => {
    e.preventDefault();
    axios.post('/api/enquiries', { propertyId: id, message: enquiry });
    setEnquiry('');
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{property.title}</h1>
      <ImageGallery images={property.images} />
      {property.video && <iframe src={property.video} width="100%" height="300" title="Video Tour" />}
      <p>{property.description}</p>
      <p>Price: {property.price.toLocaleString()} NGN | {property.bedrooms} Beds | {property.location}</p>
      <p>Type: {property.type} | Furnished: {property.furnished ? 'Yes' : 'No'} | {property.rentSale}</p>

      {/* Map */}
      {property.map && (
        <MapContainer center={[property.map.lat, property.map.lng]} zoom={13} style={{ height: '300px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[property.map.lat, property.map.lng]} />
        </MapContainer>
      )}
      <div data-aos="fade-up">
  <h1>{property.title}</h1>
</div>

<div data-aos="fade-left" className="detail-header">
  {/* content */}
</div>

      {/* Contact Agent */}
      <button><a href={`/agents/${property.agentId}`}>Contact Agent</a></button>
      <button><a href={`https://wa.me/${property.agent?.contact.whatsapp}?text=Inquiry about ${property.title}`}>WhatsApp Agent</a></button>

      {/* Save/Compare */}
      <button onClick={handleFavorite}>Save to Favorites</button>
      {/* Compare: Use local state or context for multiple */}

      {/* Enquiry Form */}
      {user && (
        <form onSubmit={handleEnquiry}>
          <textarea value={enquiry} onChange={e => setEnquiry(e.target.value)} placeholder="Your message" />
          <button type="submit">Send Enquiry</button>
        </form>
      )}

      {/* Extras: VR Tour, Social Share */}
      {property.vrTour && <iframe src={property.vrTour} title="VR Tour" />}
      <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out ${property.title}`)}>Share on X</button>
      {/* Payment for Inspection: Integrate Stripe */}
    </div>
  );
};

export default PropertyDetail;