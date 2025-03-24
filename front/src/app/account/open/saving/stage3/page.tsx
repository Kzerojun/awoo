"use client";

import React from "react";
import ProductSummary from "../components/ProductSummary";
import Button from "@/common/ui/Button";
import ProductIntro from "../../deposit/components/ProductIntro";
const Page = () => {
  return (
    <div className="container mx-auto max-w-lg py-6">
      <ProductSummary
        productName="풍족하개"
        description="산책 적금 3단계 상품"
        interest="3.3%"
        period="5개월"
        amountLimit="일일 최대 100만원"
      />
      <Button
        text="가입하기"
        onClick={() => {
          console.log("가입하기 클릭됨!");
        }}
        width="long"
        textSize="medium"
        fontBold="base"
        backgroundColor="aqua"
        className="mx-auto"
      />
      <div className="bg-gray-100 pb-18">
        {/* 아이콘 + 소개 문구 */}
        <div className="mt-8">
          <ProductIntro
            iconSrc="/icons/account/cash.svg"
            altText="3단계 강아지 보상 아이콘"
            description={[
              {
                text: "이제 산책이 습관이 되었어요 🏆",
                textSize: "text-base",
                textColor: "text-black",
                fontWeight: "font-medium",
                textAlign: "center",
              },
              {
                text: "강아지도, 나도 함께 성장하고 있어요!",
                textSize: "text-sm",
                textColor: "text-gray-600",
                fontWeight: "font-normal",
                textAlign: "center",
                marginTop: "mt-2",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
