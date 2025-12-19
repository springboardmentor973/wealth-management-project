import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Clears the token
    navigate('/login'); // Redirects to login
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4 shadow-lg">
      <div className="text-2xl font-bold tracking-wide text-blue-400">
        FinanceApp
      </div>

      <ul className="flex space-x-8">
        <li><Link to="/dashboard" className="hover:text-blue-300 transition duration-300">Dashboard</Link></li>
        <li><Link to="/goals" className="hover:text-blue-300 transition duration-300">Goals</Link></li>
        <li><Link to="/portfolio" className="hover:text-blue-300 transition duration-300">Portfolio</Link></li>
      </ul>

      <div>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;