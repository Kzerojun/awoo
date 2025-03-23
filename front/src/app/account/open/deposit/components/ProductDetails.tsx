"use client";
import React, { useState } from "react";

const tabs = [
  { id: "info", label: "상품안내" },
  { id: "benefit", label: "우대금리" },
  { id: "rate", label: "금리안내" },
  { id: "caution", label: "유의사항" },
];

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div>
      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 py-3 text-center transition-all 
            ${activeTab === tab.id ? "text-black font-semibold" : "text-gray-500"}
          `}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
            )}
          </button>
        ))}
      </div>
      {/* 탭 콘텐츠 */}
      <div className="p-8 text-gray-800 text-sm leading-relaxed">
        {activeTab === "info" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">상품 안내(예시)</h3>

            <p className="mb-2">
              <strong>AwoO 올원e통장</strong>은 자유로운 입출금이 가능한{" "}
              <strong>모바일 전용 계좌</strong>입니다. 별도의 가입 조건 없이 누구나 개설할 수
              있으며, AwoO 플랫폼을 통해 쉽고 빠르게 이용할 수 있습니다.
            </p>

            <h4 className="text-md font-semibold mt-4 mb-2">📌 주요 특징</h4>
            <ul className="list-disc ml-4 space-y-1">
              <li>
                AwoO 플랫폼 내 <strong>간편 결제 서비스(멍페이) 연동 가능</strong>
              </li>
              <li>산책 적금, 자동이체 등 다양한 금융 서비스 제공</li>
              <li>
                <strong>AwoO 내부 계좌 간 이체 시 수수료 면제</strong>
              </li>
              <li>
                모바일 앱을 통해 <strong>언제 어디서나 계좌 개설 및 관리 가능</strong>
              </li>
            </ul>

            <h4 className="text-md font-semibold mt-4 mb-2">📌 이런 분들께 추천합니다</h4>
            <ul className="list-disc ml-4 space-y-1" role="list">
              <li>입출금이 자유로운 계좌를 찾고 계신 분</li>
              <li>AwoO 플랫폼에서 멍페이 및 금융 서비스를 이용하는 고객</li>
              <li>자동이체 및 간편 결제를 주로 활용하는 사용자</li>
            </ul>
          </div>
        )}

        {activeTab === "benefit" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">우대금리</h3>

            <p className="mb-2">
              AwoO 올원e통장은 기본 금리 외에도 <strong>특정 조건 충족 시 추가 우대금리</strong>를
              제공합니다.
            </p>

            <h4 className="text-md font-semibold mt-4 mb-2">📌 우대금리 적용 조건</h4>
            <ul className="list-disc ml-4 space-y-1">
              <li>
                AwoO <strong>자동이체 등록 시 연 0.2%</strong> 우대금리 적용
              </li>
              <li>
                AwoO <strong>멍페이 서비스 연동 시 연 0.1%</strong> 추가 우대금리 제공
              </li>
              <li>
                AwoO에서 진행하는 <strong>이벤트 기간 중 추가 우대금리</strong> 혜택 제공 가능
              </li>
            </ul>

            <p className="mt-4">
              우대금리는 적용 조건 충족 시 <strong>자동 반영</strong>되며, 매월 말 기준으로 이자가
              계산됩니다.
            </p>
          </div>
        )}

        {activeTab === "rate" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">금리 안내</h3>

            <p className="mb-2">
              기본 금리: <strong className="text-blue-600">연 0.1% (세전)</strong>
            </p>

            <h4 className="text-md font-semibold mt-4 mb-2">📌 잔액별 차등 금리</h4>
            <ul className="list-disc ml-4 space-y-1">
              <li>
                <strong>100만 원 이하:</strong> 연 0.1%
              </li>
              <li>
                <strong>100만 원 초과 ~ 500만 원 이하:</strong> 연 0.2%
              </li>
              <li>
                <strong>500만 원 초과:</strong> 연 0.3%
              </li>
            </ul>

            <p className="mt-4">적용 금리는 시장 상황 및 은행 정책에 따라 변동될 수 있습니다.</p>
            <p>금리는 매월 말 기준으로 산정되며, 세전 기준으로 제공됩니다.</p>
          </div>
        )}

        {activeTab === "caution" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">유의사항</h3>

            <h4 className="text-md font-semibold mt-2 mb-2">📌 예금자 보호</h4>
            <p>
              AwoO 올원e통장은{" "}
              <strong>예금자 보호법에 따라 예금자 보호 한도(5천만 원) 내에서 보호</strong>됩니다.
            </p>

            <h4 className="text-md font-semibold mt-4 mb-2">📌 서비스 이용 시 유의사항</h4>
            <ul className="list-disc ml-4 space-y-1">
              <li>
                AwoO 플랫폼 내 <strong>간편 결제 및 자동이체 기능 활용 시</strong> 일부 우대 혜택이
                제공될 수 있습니다.
              </li>
              <li>
                우대금리 적용 조건 및 금리 변동 사항은{" "}
                <strong>은행 정책에 따라 변경될 수 있습니다.</strong>
              </li>
              <li>이자는 매월 말 기준으로 정산되며, 이자 지급 시 세금이 공제될 수 있습니다.</li>
              <li>
                본 상품의 금리 및 수수료 정책은 <strong>사전 공지 없이 변경될 수 있습니다.</strong>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
