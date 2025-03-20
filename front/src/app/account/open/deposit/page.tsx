"use client";
import React from "react";
import ProductSummary from "@/app/account/open/deposit/components/ProductSummary";
import ProductIntro from "@/app/account/open/deposit/components/ProductIntro";
import ProductDetails from "@/app/account/open/deposit/components/ProductDetails"; // ✅ 추가
import ProductDocs from "@/app/account/open/deposit/components/ProductDocs";

const Page = () => {
  return (
    <div className="container mx-auto max-w-lg py-6">
      {/* 상품 요약 정보 */}
      <ProductSummary
        productName="AW올원e통장"
        highestRate={2.0}
        baseRate={0.1}
        description="멍페이 연결가능"
        date="2025.03.20"
      />
      <div className="min-h-screen bg-gray-100">
        {/* 아이콘 + 소개 문구 */}
        <div className="mt-8">
          <ProductIntro
            iconSrc="/icons/account/wallet.svg"
            altText="통장 아이콘"
            description={[
              {
                text: "산책 적금, 멍페이 등 AwoO 내부 계좌로",
                textSize: "text-m",
                textColor: "text-black",
                fontWeight: "font-normal",
                textAlign: "center",
                marginTop: "mt-6",
              },
              {
                text: "이체 시 수수료가 면제되는 대표통장",
                textSize: "text-m",
                textColor: "text-black",
                fontWeight: "font-normal",
                textAlign: "center",
              },
              {
                text: "AwOO 고객들의 이유 있는 선택!",
                textSize: "text-xs",
                textColor: "text-gray-500",
                fontWeight: "font-normal",
                textAlign: "right",
                marginTop: "mt-6",
              },
            ]}
          />
        </div>
        {/* ✅ 상품 상세 탭 추가 */}
        <ProductDetails />
      </div>
      <ProductDocs />;
    </div>
  );
};

export default Page;
