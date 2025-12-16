import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>FinanceApp</h2>
      </div>
      
      <ul className="navbar-links">
        {/* These links match the routes Anitha is creating */}
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
      
      <div className="navbar-logout">
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;