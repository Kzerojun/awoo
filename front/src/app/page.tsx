"use client";

import { useState, useEffect } from "react";
import Button from "../common/ui/Button";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/landingPage";

export default function Home() {
  const router = useRouter();
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    // 3초 후에 랜딩 페이지를 숨기고 메인 화면 표시
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearTimeout(timer);
  }, []);

  const goToLogin = (): void => {
    router.push("/login");
  };

  // 랜딩 페이지 표시
  if (showLanding) {
    return <LandingPage />;
  }

  // 메인 페이지 표시
  return (
    <div className="relative min-h-screen bg-white">
      {/* 메인 컨텐츠 - 중앙 정렬 */}
      <main className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-3rem)]">
        <div className="flex items-center space-x-2">
          <h1 className="text-4xl font-bold text-center">AwOO</h1>
        </div>
        <p className="text-gray-500 mt-2">새로운 발자국 금융 라이프</p>

        <Button
          text="로그인 하러가기"
          backgroundColor="aqua"
          fontColor="white"
          onClick={goToLogin}
        />
      </main>
    </div>
  );
}
