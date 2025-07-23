import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../Components/Spinner/Spinner";
import ProtectedRoutes from "./ProtectedRoutes";
import LoginProtectedRoutes from "./loginProtectedRoute";
import Layout from "../Layout/Layout";
import CustomerPage from "../Pages/Customer/CustomerPage";

const Signup = lazy(() => import("../Pages/authentication/signup"));
const Login = lazy(() => import("../Pages/authentication/login"));
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<LoginProtectedRoutes />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Route Wrapper */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customer" element={<CustomerPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
