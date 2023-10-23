import React from "react";
import Products from "../components/Products";
import Header from "../components/Header";

const page = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="m-7">
        <Products />
      </div>
    </div>
  );
};

export default page;
