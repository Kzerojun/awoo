"use client";
import React from "react";

interface ProductSummaryProps {
  productName: string;
  highestRate: number;
  baseRate: number;
  description: string;
  date: string;
}

const ProductSummary = ({
  productName,
  highestRate,
  baseRate,
  description,
  date,
}: ProductSummaryProps) => {
  return (
    <div className="p-6 bg-white rounded-lg text-center">
      <h2 className="text-xl font-semibold">{productName}</h2>
      <p className="text-gray-500 text-sm mt-1">#{description}</p>
      <div className="flex justify-center items-end gap-8 mt-4">
        <div>
          <p className="text-sm text-gray-500">최고</p>
          <p className="text-3xl font-bold text-teal-500">{highestRate}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">기본</p>
          <p className="text-3xl font-bold text-gray-800">{baseRate}%</p>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-1">(연/세전) {date} 기준</p>
    </div>
  );
};

export default ProductSummary;
