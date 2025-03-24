"use client";

import { useState } from "react";

const tabs = [
  { id: "info", label: "상품안내" },
  { id: "rate", label: "금리안내" },
  { id: "caution", label: "유의사항" },
];

const ProductDetailsStep1 = () => {
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
            <h3 className="text-base font-semibold mb-3">산뜻하개 통장이란?</h3>
            <p>
              산책 습관을 만들고 싶은 반려인을 위한 1단계 적금 상품입니다. 3개월 동안 강아지와 함께
              산책 목표를 달성하면 다음 단계로 진입할 수 있어요.
            </p>
            <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-1">
              <li>가입 기간: 3개월</li>
              <li>강아지별 1개 가입 가능</li>
              <li>다음 단계 진입 조건: 월 20회 이상 산책</li>
            </ul>
          </div>
        )}

        {activeTab === "rate" && (
          <div>
            <h3 className="text-base font-semibold mb-3">📈 금리 안내</h3>
            <p>
              기본 금리: <strong>2.3%</strong>
            </p>
            <p className="mt-2 text-gray-700">
              매월 20회 이상 산책을 3개월간 달성 시, 2단계 적금 가입 자격이 주어집니다.
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>산책 1회 기준: 30분 이상 & 1.5km 이상</li>
              <li>기준 미달 시, 다음 단계로 진입 불가</li>
            </ul>
          </div>
        )}

        {activeTab === "caution" && (
          <div>
            <h3 className="text-base font-semibold mb-1">📌 유의사항</h3>
            <p>산책 기록은 강아지별로 자동 측정됩니다.</p>
            <p className="mt-1">예금자보호법에 따라 1인당 5천만 원까지 보호됩니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsStep1;
