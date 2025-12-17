import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your Navbar
import Navbar from "./components/Navbar";

// Import the Login page you already had
import Login from "./pages/Login";

function App() {
  return (
    // We MUST wrap everything in Router for the Navbar links to work
    <Router>
      <div className="app-container">
        {/* This places the Navbar at the top of every page */}
        <Navbar />

        <div className="p-4">
          <Routes>
            {/* Route 1: Show Login page by default */}
            <Route path="/" element={<Login />} />
            
            {/* Route 2: Explicit Login path */}
            <Route path="/login" element={<Login />} />

            {/* Temporary Placeholders for your Navbar links 
               (So you can click them without errors for your screenshot) */}
            <Route path="/dashboard" element={<h2>Dashboard Page (Coming Soon)</h2>} />
            <Route path="/goals" element={<h2>Goals Page (Coming Soon)</h2>} />
            <Route path="/portfolio" element={<h2>Portfolio Page (Coming Soon)</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;