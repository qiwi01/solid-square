// frontend/src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/Header.css';
import { FiMoon, FiSun } from 'react-icons/fi';

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          SolidSquare
        </Link>

        {/* Desktop Nav */}
        <nav className={`nav-links ${mobileMenu ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/blog">Blog</Link>

          {/* Auth Links */}
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              {user.isAdmin && <Link to="/admin">Admin</Link>}
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Right-side controls */}
        <div className="header-controls">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="theme-toggle"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;