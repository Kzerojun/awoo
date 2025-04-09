"use client";
import React from "react";

interface ProductSummaryProps {
  productName: string;
  description: string;
  interest: string;
  period: string;
  amountLimit: string;
}

const ProductSummary = ({
  productName,
  description,
  interest,
  period,
  amountLimit,
}: ProductSummaryProps) => {
  return (
    <div className="p-6 bg-white rounded-lg px-10 mt-4">
      <h2 className="text-2xl font-semibold">{productName}</h2>
      <p className="text-gray-500 text-sm mt-1">#{description}</p>

      {/* 이율 표시 */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">이율</p>
        <p className="text-3xl font-bold text-aqua">{interest}</p>
      </div>

      {/* 상품 조건 */}
      <div className="mt-6 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">가입 기간</span>
          <span>{period}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">일일 납입 한도</span>
          <span>{amountLimit}</span>
        </div>
      </div>
      {/* 일일 적금 안내 */}
      <p className="text-xs text-gray-500 mt-5">
        💡 매일 일정 금액을 적립하는 일일 적금 상품입니다.
      </p>
    </div>
  );
};

export default ProductSummary;
