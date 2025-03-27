"use client";
import React from "react";

import DepositTop from "../components/DepositTop";
import DepositBottom from "../components/DepositBottom";

const MyDepositPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <DepositTop />
      <DepositBottom />
    </div>
  );
};

export default MyDepositPage;
