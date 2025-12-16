import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    // 1. Main container: Flexbox, dark bg, white text, padding
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4 shadow-md">
      
      {/* 2. Logo */}
      <div className="text-xl font-bold">
        <h2>FinanceApp</h2>
      </div>
      
      {/* 3. Links: Flex row, space between items */}
      <ul className="flex space-x-6">
        <li>
          <Link to="/dashboard" className="hover:text-blue-400 transition duration-200">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-blue-400 transition duration-200">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-blue-400 transition duration-200">
            Register
          </Link>
        </li>
      </ul>
      
      {/* 4. Logout Button: Red bg, rounded corners */}
      <div>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;