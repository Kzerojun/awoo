"use client";
import React from "react";

interface ProductSummaryProps {
  productName: string;
  description: string;
}

const ProductSummary = ({ productName, description }: ProductSummaryProps) => {
  return (
    <div className="p-6 bg-white rounded-lg px-10">
      <h2 className="text-2xl font-semibold">{productName}</h2>
      <p className="text-gray-500 text-sm mt-1">#{description}</p>
    </div>
  );
};

export default ProductSummary;
