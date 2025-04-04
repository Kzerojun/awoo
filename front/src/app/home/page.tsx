"use client";

import Header from "@/app/home/components/Header";
import SavingRecommendation from "./components/SavingRecommendation";
import MainActions from "./components/Mainactions";
import InfoCard from "./components/InfoCard";
import { useFCMToken } from "@/hooks/alarm/useFCM";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/lib/store";
import { clearHistory } from "@/lib/slices/userActionSlice";
import WalkPostitCarousel from "@/app/home/components/WalkPostitCarousel";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { checkAndUpdateToken } = useFCMToken();
  useEffect(() => {
    checkAndUpdateToken(); // 앱 진입할 때 토큰 갱신 검사
    dispatch(clearHistory()); // 뒤로가기 스택 초기화
  }, []);
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
        </div>
        <div className="space-y-3 pt-1">
          <WalkPostitCarousel />
        </div>
      </div>
    </div>
  );
}
