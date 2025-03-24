"use client";

import React from "react";
import ProductSummary from "../components/ProductSummary";
import Button from "@/common/ui/Button";
import ProductIntro from "../../deposit/components/ProductIntro";
import UserReview from "@/app/account/open/saving/components/UserReview";
import ProductDetailsStep2 from "../components/ProductDetailStep2";
import ProductDocs from "../components/ProductDocs";

const step2Reviews = [
  {
    text: "이제 산책이 루틴이 되었어요!",
    user: "routi***ne",
  },
  {
    text: "우리집 강아지가 더 건강해졌어요 😊",
    user: "with***dog",
  },
  {
    text: "꾸준히 걷고 저축하니까 보람도 두 배예요!",
    user: "keep***go",
  },
];

const Page = () => {
  return (
    <div className="container mx-auto max-w-lg py-6">
      <ProductSummary
        productName="적절하개"
        description="산책 적금 2단계 상품"
        interest="2.8%"
        period="4개월"
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
            altText="2단계 강아지 산책 아이콘"
            description={[
              {
                text: "매일 꾸준히 산책 중! 🐾",
                textSize: "text-base",
                textColor: "text-black",
                fontWeight: "font-medium",
                textAlign: "center",
              },
              {
                text: "오늘도 한 걸음, 내일은 두 걸음",
                textSize: "text-sm",
                textColor: "text-gray-600",
                fontWeight: "font-normal",
                textAlign: "center",
                marginTop: "mt-2",
              },
            ]}
          />
          <UserReview reviews={step2Reviews} />
        </div>
      </div>
      <ProductDetailsStep2 />
      <ProductDocs />
    </div>
  );
};

export default Page;
