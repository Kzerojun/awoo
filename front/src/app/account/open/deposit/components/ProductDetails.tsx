"use client";
import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const tabs = [
  { id: "info", label: "상품안내" },
  { id: "caution", label: "유의사항" },
];

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="bg-white rounded-lg shadow">
      {/* 탭 메뉴 */}
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

      {/* 콘텐츠 */}
      <div className="p-6 text-gray-800 text-sm space-y-6">
        {activeTab === "info" && (
          <div>
            <h3 className="text-base font-semibold text-black mb-3">AwoO 올원e통장이란?</h3>
            <p className="mb-4">
              <strong>AwoO 올원e통장</strong>은 자유로운 입출금이 가능한{" "}
              <strong>모바일 전용 계좌</strong>입니다. 누구나 조건 없이 개설 가능하며, AwoO 플랫폼의
              다양한 서비스와 연동해 사용할 수 있어요.
            </p>

            <h4 className="font-semibold mb-2">✔️ 주요 특징</h4>
            <ul className="space-y-1 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-aqua mt-0.5" />
                멍페이와 연결해 간편 결제 가능
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-aqua mt-0.5" />
                산책 적금, 자동이체와 연동 쉬움
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-aqua mt-0.5" />
                AwoO 내부 이체 시 수수료 면제
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-aqua mt-0.5" />
                모바일 앱으로 실시간 계좌 관리
              </li>
            </ul>

            <h4 className="font-semibold mt-6 mb-2">🎯 이런 분들께 추천해요</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>입출금이 자유로운 통장을 원하는 분</li>
              <li>AwoO 서비스(멍페이, 적금 등)를 자주 이용하는 사용자</li>
              {/* <li>자동이체, 실시간 거래 알림이 필요한 분</li> */}
            </ul>
          </div>
        )}

        {activeTab === "caution" && (
          <div>
            <h3 className="text-base font-semibold mb-4">이용 전 꼭 확인하세요</h3>

            <section className="mb-5">
              <h4 className="text-sm font-semibold text-gray-800 mb-1">🛡️ 예금자 보호</h4>
              <p className="text-sm text-gray-700">
                본 상품은 <strong>예금자보호법에 따라 1인당 5천만 원 한도 내 보호</strong>됩니다.
              </p>
            </section>

            <section>
              <h4 className="text-sm font-semibold text-gray-800 mb-1">⚠️ 기타 안내</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>간편결제, 자동이체 등 서비스는 일부 혜택을 제공할 수 있어요.</li>
                <li>서비스 조건 및 혜택은 상황에 따라 변경될 수 있습니다.</li>
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
