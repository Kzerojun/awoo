import React, { useState } from "react";

// admin.ts에서 가져온 타입 정의 사용
import { SavingsProduct } from "@/api/admin/admin";

interface ProductCardProps {
  product: SavingsProduct;
  onProductUpdated: () => void;
}

export default function ProductCard({ product, onProductUpdated }: ProductCardProps) {
  // 현재는 활성화/비활성화 기능 API가 없으므로, 기본적으로 모든 상품은 활성 상태로 가정
  const [isActive, setIsActive] = useState(true);

  // 상품 활성화/비활성화 토글 핸들러 (API 연동 필요 시 추가)
  const handleToggleActive = () => {
    // 실제로는 API 호출을 통해 상품 상태를 업데이트하는 로직이 필요
    setIsActive(!isActive);
    // API 연동 시 주석 해제: onProductUpdated();
  };

  // 상품 수정 핸들러 (API 연동 필요 시 추가)
  const handleEdit = () => {
    console.log(`상품 수정: ${product.accountName}`);
    // 수정 기능 구현 시 여기에 코드 추가
  };

  // 가입 기간 형식 변환 (예: "6" -> "6일")
  const formatPeriod = (period: string) => {
    return `${period}일`;
  };

  // 금액 단위 변환 (원 -> 만원)
  const toManWon = (amount: number) => {
    return Math.floor(amount / 10000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800 mb-1">{product.accountName}</h2>
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

        {product.accountDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.accountDescription}</p>
        )}

        <div className="flex flex-wrap gap-y-2 mb-4">
          <div className="w-1/2">
            <div className="text-gray-500 text-xs">가입 기간</div>
            <div className="text-gray-700">{formatPeriod(product.subscriptionPeriod)}</div>
          </div>
          <div className="w-1/2">
            <div className="text-gray-500 text-xs">가입 가능 금액</div>
            <div className="text-gray-700">
              최저 {toManWon(product.minSubscriptionBalance)}만원 ~ 최대{" "}
              {toManWon(product.maxSubscriptionBalance)}만원
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-500 text-xs">이자율</span>
            <div className="text-right">
              <span className="text-red-500 font-bold">
                최고 : {product.interestRate.toFixed(1)}%
              </span>
            </div>
          </div>
          {product.rateDescription && (
            <p className="text-gray-600 text-xs">{product.rateDescription}</p>
          )}
        </div>

        <div className="flex justify-between items-center gap-2">
          <button
            className="flex-1 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md transition duration-200 text-sm font-medium"
            onClick={handleEdit}
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
