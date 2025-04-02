"use client";

import Header from "@/app/home/components/Header";
import SavingRecommendation from "./components/SavingRecommendation";
import MainActions from "./components/Mainactions";
import InfoCard from "./components/InfoCard";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      {/* 네비게이션 바 */}
      <Header />

      <div className="p-4 pt-16 space-y-4">
        <div className="mb-3">
          {/* 추천 적금 배너 */}
          <SavingRecommendation />
        </div>
        {/* 주요 기능 버튼 */}
        <MainActions />

        {/* 정보 카드 */}
        <div className="space-y-3 pt-1">
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
        <div onClick={() => router.push(`/alarm`)}>알림 테스트</div>
      </div>
    </div>
  );
}
