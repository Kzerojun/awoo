"use client";

import Header from "@/app/home/components/Header";
import SavingRecommendation from "./components/SavingRecommendation";
import MainActions from "./components/Mainactions";
import InfoCard from "./components/InfoCard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 네비게이션 바 */}
      <Header />

      <div className="p-4 pt-0 space-y-3">
        {/* 추천 적금 배너 */}
        <SavingRecommendation />

        {/* 주요 기능 버튼 */}
        <MainActions />

        {/* 정보 카드 */}
        <InfoCard
          title="안전한 중고거래, 멍페이로 해결"
          description="입출금 계좌 개설하고, 간편하게 멍페이로 결제하세요!"
        />

        <InfoCard
          title="반려견을 위한 보험"
          description="쉽게 찾고 쉽게 가입할 수 있어요!"
          iconSrc="/icons/main/scales.svg"
        />
      </div>
    </div>
  );
}
