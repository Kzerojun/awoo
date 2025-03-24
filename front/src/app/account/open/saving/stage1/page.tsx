"use client";

import React from "react";
import ProductSummary from "../components/ProductSummary";
import Button from "@/common/ui/Button";

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
    </div>
  );
};
export default Page;
