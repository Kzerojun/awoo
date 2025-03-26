"use client";
import React from "react";
import ProductSummary from "@/app/account/open/deposit/components/ProductSummary";
import ProductIntro from "@/app/account/open/deposit/components/ProductIntro";
import ProductDetails from "@/app/account/open/deposit/components/ProductDetails"; // ✅ 추가
import ProductDocs from "@/app/account/open/deposit/components/ProductDocs";
import Button from "@/common/ui/Button";
import ReviewSwiper from "./components/ReviewSwiper";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto max-w-lg py-6">
      {/* 상품 요약 정보 */}
      <ProductSummary productName="AW올원e통장" description="멍페이 연결가능" />

      <div className="mt-10 px-10">
        <h2 className="text-base font-semibold mb-4"> AwOO 서비스를 100% 활용</h2>
        <div className="space-y-2 text-sm text-gray-700 list-disc list-inside">
          <p className="flex items-start gap-2">
            <span className="text-aqua">✔</span>
            <span>멍페이 연동으로 안심결제 가능</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-aqua">✔</span>
            <span>산책 적금 이체 시 수수료 면제</span>
          </p>
          {/* <p className="flex items-start gap-2">
            <span className="text-aqua">✔</span>
            <span>실시간 거래 내역 알림 제공</span>
          </p> */}
          <p className="flex items-start gap-2">
            <span className="text-aqua">✔</span>
            <span>모든 AwoO 서비스와 손쉬운 연결</span>
          </p>
        </div>
      </div>

      <Button
        text="가입하기"
        onClick={() => {
          router.push("/account/open/deposit/agreement");
        }}
        width="long" // 버튼 길이
        textSize="medium" // 텍스트 크기
        fontBold="base" // 글씨 굵기
        backgroundColor="aqua" // 배경색
        className="mx-auto mt-8"
      />
      <div className=" bg-gray-100 pb-18">
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
                textAlign: "center",
                marginTop: "mt-6",
              },
            ]}
          />
        </div>
        <ReviewSwiper />
      </div>

      {/* ✅ 상품 상세 탭 추가 */}
      <ProductDetails />
      <ProductDocs />
    </div>
  );
};

export default Page;
