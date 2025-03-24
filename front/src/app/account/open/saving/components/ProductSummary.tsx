"use client";
import React from "react";

interface ProductSummaryProps {
  productName: string;
  description: string;
  interest: string;
}

const ProductSummary = ({ productName, description, interest }: ProductSummaryProps) => {
  return (
    <div className="p-6 bg-white rounded-lg px-10">
      <h2 className="text-2xl font-semibold">{productName}</h2>
      <p className="text-gray-500 text-sm mt-1">#{description}</p>

      {/* 이율 표시 */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">이율</p>
        <p className="text-3xl font-bold text-aqua">{interest}</p>
      </div>
    </div>
  );
};

export default ProductSummary;
