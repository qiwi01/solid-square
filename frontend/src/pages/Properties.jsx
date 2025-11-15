import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import '../styles/Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    axios.get('/api/properties', { params: filters }).then(res => setProperties(res.data));
  }, [filters]);

  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ display: 'flex' }}>
      {/* Filters Sidebar */}
      <aside style={{ width: '30%', padding: '20px' }}>
        <h3>Filters</h3>
        <input name="location" placeholder="Location" onChange={handleFilter} />
        <input name="priceMin" type="number" placeholder="Min Price" onChange={handleFilter} />
        <input name="priceMax" type="number" placeholder="Max Price" onChange={handleFilter} />
        <input name="bedrooms" type="number" placeholder="Bedrooms" onChange={handleFilter} />
        <select name="type" onChange={handleFilter}>
          <option value="">Property Type</option>
          <option value="apartment">Apartment</option>
          {/* Add more */}
        </select>
        <select name="furnished" onChange={handleFilter}>
          <option value="">Furnished</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="rentSale" onChange={handleFilter}>
          <option value="">Rent/Sale</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
      </aside>

      {/* Listings */}
      <main style={{ width: '70%' }}>
        <h2>Properties</h2>
        <div className="grid">
          {properties.map(prop => <PropertyCard key={prop._id} property={prop} />)}
        </div>
      </main>
    </div>
  );
};

export default Properties;