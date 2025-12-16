import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    // Main Navbar Container: Flexbox, dark gray bg, white text, padding, shadow
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4 shadow-lg">
      
      {/* 1. App Name/Logo */}
      <div className="text-2xl font-bold tracking-wide text-blue-400">
        FinanceApp
      </div>

      {/* 2. Navigation Links */}
      <ul className="flex space-x-8">
        <li>
          <Link to="/dashboard" className="hover:text-blue-300 transition duration-300 font-medium">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-blue-300 transition duration-300 font-medium">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-blue-300 transition duration-300 font-medium">
            Register
          </Link>
        </li>
      </ul>

      {/* 3. Logout Button */}
      <div>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;