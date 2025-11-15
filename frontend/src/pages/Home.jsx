// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import MortgageCalculator from '../components/MortgageCalculator';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [featuredRes, recentRes] = await Promise.all([
          axios.get('/api/properties?featured=true'),
          axios.get('/api/properties?sort=-createdAt&limit=6')
        ]);

        // Ensure we always have arrays
        setFeatured(Array.isArray(featuredRes.data) ? featuredRes.data : []);
        setRecent(Array.isArray(recentRes.data) ? recentRes.data : []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load properties. Please try again.');
        setFeatured([]);
        setRecent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: 'white' }}>
        <h2>Loading properties...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#f8d7da' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Find Your Dream Home in Nigeria</h1>
        <p>Luxury estates in Lagos, Abuja, Ibadan & beyond</p>
        <div className="search-bar">
          <input type="text" placeholder="Enter location (e.g. Lekki)" />
          <select>
            <option>Buy</option>
            <option>Rent</option>
          </select>
          <select>
            <option>Any Price</option>
            <option>₦50M - ₦100M</option>
            <option>₦100M+</option>
          </select>
          <button className="btn">Search</button>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-grid">
        <h2 className="section-title">Featured Properties</h2>
        {featured.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#ccc' }}>No featured properties yet.</p>
        ) : (
          <div className="grid">
            {featured.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Properties */}
      <section>
        <h2 className="section-title">Recently Added</h2>
        {recent.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#ccc' }}>No recent properties.</p>
        ) : (
          <div className="grid">
            {recent.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Locations */}
      <section>
        <h2 className="section-title">Explore Popular Cities</h2>
        <div className="grid">
          {['Lagos', 'Abuja', 'Ogun', 'Ibadan'].map(city => (
            <div key={city} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3>{city}</h3>
              <Link to={`/properties?location=${city}`}>
                <button className="btn" style={{ marginTop: '1rem' }}>View Listings</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section data-aos="fade-up">
  <h2 className="section-title">Featured Properties</h2>
  <div className="grid">
    {featured.map((property, i) => (
      <div key={property._id} data-aos="fade-up" data-aos-delay={i * 100}>
        <PropertyCard property={property} />
      </div>
    ))}
  </div>
</section>

      {/* Mortgage Calculator */}
      <section style={{ margin: '4rem 0' }}>
        <h2 className="section-title">Mortgage Calculator</h2>
        <MortgageCalculator />
      </section>
    </div>
  );
};

export default Home;