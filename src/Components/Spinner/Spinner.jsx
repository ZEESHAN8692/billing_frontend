import React from "react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    </>
  );
};

export default Spinner;
