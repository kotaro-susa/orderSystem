import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Orders from "../components/Orders";

const DashBoard = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex justify-end m-3">
        <Button />
      </div>
      <div className="flex justify-center mt-8">
        <Orders />
      </div>
    </>
  );
};

export default DashBoard;
