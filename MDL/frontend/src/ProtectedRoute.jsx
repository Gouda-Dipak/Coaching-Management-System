// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem(allowedRoles); // 'admin', 'teacher', or 'student'

  if (!token || !role) {
    return <Navigate to="/" />; // send to Home if unauthorized
  }

  return children;
};

export default ProtectedRoute;
