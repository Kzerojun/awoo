"use client";

import React from "react";
import ProductSummary from "../components/ProductSummary";
import Button from "@/common/ui/Button";
import ProductIntro from "../../deposit/components/ProductIntro";
import UserReview from "@/app/account/open/saving/components/UserReview";
import ProductDetailsStep1 from "../components/ProductDetailStep1";
import ProductDocs from "../components/ProductDocs";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import {
  setAccountType,
  setSavingStage,
  resetAccountProgress,
} from "@/lib/slices/accountProgressSlice";
const step1Reviews = [
  {
    text: "처음 시작인데 부담 없이 할 수 있어서 좋아요!",
    user: "start***dog",
  },
  {
    text: "강아지랑 같이 목표 세운 기분이에요 🐶",
    user: "puppy***love",
  },
  {
    text: "매일 조금씩 쌓이는 재미가 있어요.",
    user: "walk***step",
  },
];

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
          // 리셋하고 시작
          dispatch(resetAccountProgress());
          // 두 액션 모두 accountProgressSlice에서 가져온 것 사용
          dispatch(setAccountType("saving"));
          dispatch(setSavingStage(1));

          // 액션이 적용된 후 라우팅
          setTimeout(() => {
            router.push("/account/open/saving/agreement");
          }, 100);
        }}
        width="long"
        textSize="medium"
        fontBold="base"
        backgroundColor="aqua"
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
        <UserReview reviews={step1Reviews} />
      </div>
      <ProductDetailsStep1 />
      <ProductDocs />
    </div>
  );
};
export default Page;
