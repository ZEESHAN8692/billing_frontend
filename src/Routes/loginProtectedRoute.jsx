import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const LoginProtectedRoutes = () => {
  const location = useLocation();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  return token ? (
    <Navigate to={location.state?.from || "/"} replace />
  ) : (
    <Outlet />
  );
};

export default LoginProtectedRoutes;

