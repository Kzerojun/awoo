import React, { useState } from "react";
import { ProductData } from "../data/mockData";

interface ProductCardProps {
  product: ProductData;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isActive, setIsActive] = useState(product.isActive);

  // 상품 활성화/비활성화 토글 핸들러
  const handleToggleActive = () => {
    // 실제로는 API 호출을 통해 상품 상태를 업데이트하는 로직이 필요
    setIsActive(!isActive);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h2>
          <div className="flex items-center">
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                isActive ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-500"
              }`}
            >
              {isActive ? "활성" : "비활성"}
            </span>
          </div>
        </div>

        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        )}

        <div className="flex flex-wrap gap-y-2 mb-4">
          <div className="w-1/2">
            <div className="text-gray-500 text-xs">가입 기간</div>
            <div className="text-gray-700">{product.period}</div>
          </div>
          <div className="w-1/2">
            <div className="text-gray-500 text-xs">가입 가능 금액</div>
            <div className="text-gray-700">
              최저 {product.minAmount}만원 ~ 최대 {product.maxAmount}만원
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-500 text-xs">이자율</span>
            <div className="text-right">
              <span className="text-red-500 font-bold">최고 : {product.maxRate.toFixed(1)}%</span>
              <span className="text-gray-500 mx-1">|</span>
              <span className="text-gray-700">최저 : {product.minRate.toFixed(1)}%</span>
            </div>
          </div>
          {product.rateDescription && (
            <p className="text-gray-600 text-xs">{product.rateDescription}</p>
          )}
        </div>

        <div className="flex justify-between items-center gap-2">
          <button
            className="flex-1 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md transition duration-200 text-sm font-medium"
            onClick={() => console.log(`편집: ${product.name}`)}
          >
            수정하기
          </button>
          <button
            className={`flex-1 py-2 px-4 ${
              isActive
                ? "bg-red-50 hover:bg-red-100 text-red-600"
                : "bg-teal-50 hover:bg-teal-100 text-teal-600"
            } rounded-md transition duration-200 text-sm font-medium`}
            onClick={handleToggleActive}
          >
            {isActive ? "비활성화" : "활성화"}
          </button>
        </div>
      </div>
    </div>
  );
}
