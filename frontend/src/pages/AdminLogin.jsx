// frontend/src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // FIX: Create data object from state
    const data = { email, password };

    try {
      const res = await API.post('/api/auth/login', data);

      if (!res.data.user.isAdmin) {
        setError('Access denied. Admin only.');
        return;
      }

      login(res.data.token, res.data.user);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-logo">
          <span>SolidSquare</span>
          <span className="badge">ADMIN</span>
        </div>
        <h2>Admin Portal</h2>
        <p>Secure access only</p>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="admin@solidsquare.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-admin">
            Login as Admin
          </button>
        </form>

        <p className="footer-note">
          Not an admin? <a href="/login">User Login</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;