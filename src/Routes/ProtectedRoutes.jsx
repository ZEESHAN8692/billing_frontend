import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
