import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../Components/Spinner/Spinner";
import ProtectedRoutes from "./ProtectedRoutes";
import LoginProtectedRoutes from "./loginProtectedRoute";
import Layout from "../Layout/Layout";

const CustomerTablePage = lazy(() => import("../Pages/Customer/CustomerTable"));
const PurchaseUpdate = lazy(() => import("../Pages/Purchase/PurchaseUpdate"));
const UpdateCustomer = lazy(() => import("../Pages/Customer/UpdateCustomer"));
const ProductUpdate = lazy(() => import("../Pages/ProductsPage/ProductUpdate"));
const Profile = lazy(() => import("../Pages/Profile/Profile"));
const CreateInvoices = lazy(() => import("../Pages/Invoice/CreateInvoice"));
const Invoices = lazy(() => import("../Pages/Invoice/Invoices"));
const PurchaseTable = lazy(() => import("../Pages/Purchase/PurchaseTable"));
const AddPurchase = lazy(() => import("../Pages/Purchase/AddPurchase"));
const ProductTable = lazy(() => import("../Pages/ProductsPage/ProductTable"));
const CustomerPage = lazy(() => import("../Pages/Customer/CustomerPage"));
const ProductsPage = lazy(() => import("../Pages/ProductsPage/ProductsPage"));
const Signup = lazy(() => import("../Pages/authentication/signup"));
const Login = lazy(() => import("../Pages/authentication/login"));
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"));
const InvoiceComponent = lazy(() =>
  import("../Pages/Invoice/InvoiceComponent")
);

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
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-customers" element={<CustomerPage />} />
              <Route path="/customers" element={<CustomerTablePage />} />
              <Route path="/add-products" element={<ProductsPage />} />
              <Route path="/product-list" element={<ProductTable />} />
              <Route path="/add-purchase" element={<AddPurchase />} />
              <Route path="/purchase-order" element={<PurchaseTable />} />
              <Route path="/create-invoices" element={<CreateInvoices />} />
              <Route path="/invoices" element={<Invoices />} />

              <Route path="/update-product/:id" element={<ProductUpdate />} />
              <Route path="/update-customer/:id" element={<UpdateCustomer />} />
              <Route path="/update-purchase/:id" element={<PurchaseUpdate />} />

              <Route
                path="/download-invoice/:id"
                element={<InvoiceComponent />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
