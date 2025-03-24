"use client";

import { useState } from "react";

const tabs = [
  { id: "info", label: "상품안내" },
  { id: "rate", label: "금리안내" },
  { id: "caution", label: "유의사항" },
];

const ProductDetailsStep3 = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 py-3 text-center transition-all ${
              activeTab === tab.id ? "text-black font-semibold" : "text-gray-500"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
            )}
          </button>
        ))}
      </div>

      <div className="p-6 text-gray-800 text-sm space-y-6">
        {activeTab === "info" && (
          <div>
            <h3 className="text-base font-semibold mb-3">풍족하개 통장이란?</h3>
            <p>
              산책 습관을 완전히 정착시킨 반려인을 위한 마지막 단계 상품입니다. 가장 긴 기간을
              완주하면 가장 높은 금리를 받을 수 있어요.
            </p>
            <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-1">
              <li>가입 기간: 5개월</li>
              <li>2단계 달성 시 가입 가능</li>
              <li>마지막 단계로, 이후 단계 없음</li>
            </ul>
          </div>
        )}

        {activeTab === "rate" && (
          <div>
            <h3 className="text-base font-semibold mb-3">📈 금리 안내</h3>
            <p>
              기본 금리: <strong>3.3%</strong>
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>매월 20회 이상 산책 시 만기 금리 적용</li>
              <li>산책 1회 기준: 30분 이상 & 1.5km 이상</li>
              <li>기준 미달 시, 일부 적용 제한 가능</li>
            </ul>
          </div>
        )}

        {activeTab === "caution" && (
          <div>
            <h3 className="text-base font-semibold mb-1">📌 유의사항</h3>
            <p>3단계는 마지막 단계입니다.</p>
            <p>
              3단계 만기 이후에도 3단계 적금 상품 이용이 가능합니다. 강아지별로 1개의 적금만 운영할
              수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsStep3;
