import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Step 1: Check token existence
  const token = localStorage.getItem("isLoggedIn");

  // Step 2: Redirect to login if missing
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Step 3: Allow access to protected (simulation) routes
  return <Outlet />;
};

export default PrivateRoute;
