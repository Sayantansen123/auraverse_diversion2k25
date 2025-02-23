import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authcontext/authcontext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;