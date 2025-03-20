"use client";
import React from "react";
import ProductSummary from "./components/ProductSummary";

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ProductSummary
        productName="AwOO 올원e통장"
        highestRate={2.0}
        baseRate={0.1}
        description="멍페이 연결가능"
        date="2025.03.20"
      />
    </div>
  );
};
export default Page;
