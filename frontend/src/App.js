import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import components
import ProtectedRoute from './components/ProtectedRoute';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Goals from "./pages/Goals";

function AppContent() {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Navigation Links - Only visible if authenticated */}
      {user && (
        <nav style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
          alignItems: "center"
        }}>
          <span style={{ fontWeight: "bold", marginRight: "auto" }}>Wealth Manager</span>
          <Link to="/dashboard" style={navStyle}>Dashboard</Link>
          <Link to="/portfolio" style={navStyle}>Portfolio</Link>
          <Link to="/goals" style={navStyle}>Goals</Link>
          <button
            onClick={logout}
            style={{
              marginLeft: "1rem",
              padding: "6px 12px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </nav>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/goals" element={<Goals />} />
        </Route>

        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        {/* Catch all - redirect to login if not found */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

const navStyle = {
  textDecoration: "none",
  color: "#007bff",
  fontWeight: "500"
};

export default App;