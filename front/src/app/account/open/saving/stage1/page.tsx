"use client";

import React from "react";
import ProductSummary from "../components/ProductSummary";
import Button from "@/common/ui/Button";
import ProductIntro from "../../deposit/components/ProductIntro";
const Page = () => {
  return (
    <div className="container mx-auto max-w-lg py-6">
      <ProductSummary
        productName="산뜻하개"
        description="산책 적금 1단계 상품"
        interest="2.3%"
        period="3개월"
        amountLimit="일일 최대 100만원"
      />
      <Button
        text="가입하기"
        onClick={() => {
          // 👉 가입 로직 or 라우팅 처리
          console.log("가입하기 클릭됨!");
        }}
        width="long" // 버튼 길이
        textSize="medium" // 텍스트 크기
        fontBold="base" // 글씨 굵기
        backgroundColor="aqua" // 배경색
        className="mx-auto"
      />
      <div className=" bg-gray-100 pb-18">
        {/* 아이콘 + 소개 문구 */}
        <div className="mt-8">
          <ProductIntro
            iconSrc="/icons/account/cash.svg" // 저장한 파일 경로에 맞춰 수정
            altText="1단계 말티즈 강아지"
            description={[
              {
                text: "이제 막 시작한 산책 적금 🐕‍🦺 ",
                textSize: "text-base",
                textColor: "text-black",
                fontWeight: "font-medium",
                textAlign: "center",
              },
              {
                text: "작은 걸음이 쌓이면, 큰 보상이 따라와요!",
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
