"use client";

import React from "react";
import ProductSummary from "../components/ProductSummary";
import Button from "@/common/ui/Button";
import ProductIntro from "../../deposit/components/ProductIntro";
import UserReview from "@/app/account/open/saving/components/UserReview";
import ProductDetailsStep3 from "../components/ProductDetailStep3";
import ProductDocs from "../components/ProductDocs";

const step3Reviews = [
  {
    text: "꾸준히 함께한 여정이 정말 뿌듯해요! 계속 이용할 계획입니다.",
    user: "walk***done",
  },
  {
    text: "산책도 적금도 이제는 습관이 되었어요 💪 아이도 너무 좋아해요",
    user: "cons***habit",
  },
  {
    text: "미리 들어둔 적금으로 아이 병원비에 보탤 수 있었어요",
    user: "healt***save",
  },
];

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
          <UserReview reviews={step3Reviews} />
        </div>
      </div>
      <ProductDetailsStep3 />
      <ProductDocs />
    </div>
  );
};

export default Page;
