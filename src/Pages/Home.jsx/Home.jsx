import React from "react";
import { Helmet } from "react-helmet-async";
// import { toast } from "react-toastify";

const Home = () => {
  // toast.success("Hello everyone");
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div>Billing Dashboard</div>
    </>
  );
};

export default Home;
