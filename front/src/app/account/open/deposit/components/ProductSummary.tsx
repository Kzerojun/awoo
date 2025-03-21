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
    <div className="p-6 bg-white rounded-lg ml-7">
      <h2 className="text-2xl font-semibold">{productName}</h2>
      <p className="text-gray-500 text-sm mt-1">#{description}</p>

      {/* 금리 정보 섹션 */}
      <div className="flex flex-col gap-y-6 mt-10">
        <div className="flex items-end gap-8">
          <div>
            <p className="text-sm text-gray-500">최고</p>
            <p className="text-3xl font-bold text-teal-500">{highestRate}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">기본</p>
            <p className="text-3xl font-bold text-gray-800">{baseRate}%</p>
          </div>
        </div>

        {/* (연/세전) 기준 날짜 */}
        <div>
          <p className="text-xs text-gray-400">(연/세전) {date} 기준</p>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
