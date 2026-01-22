import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Goals from "./pages/Goals";
import MarketData from "./pages/MarketData";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "1rem", margin: "1rem" }}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/goals">Goals</Link>
        <Link to="/market">Market</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/goals" element={<Goals />} />
        </Route>

        {/* Market data page */}
        <Route path="/market" element={<MarketData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

