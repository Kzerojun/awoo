"use client";

import { useState, useEffect } from "react";
import Button from "../common/ui/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import landingLogo from "../../public/logos/AwOO_landing.svg";
import awoologo from "../../public/logos/AwOO_logo.svg";

export default function Home() {
  const router = useRouter();
  const [showLanding, setShowLanding] = useState(true);
  const [animationStage, setAnimationStage] = useState("initial");
  const [isRedirecting, setIsRedirecting] = useState(false);

  // 모바일 감지 함수
  const isMobile = () => {
    if (typeof window === "undefined") return false;

    // User-Agent 기반 확인
    const userAgent = navigator.userAgent;
    const mobileByAgent = Boolean(
      userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
    );

    // 화면 크기 기반 확인 (768px 미만을 모바일로 간주)
    const mobileBySize = window.innerWidth < 768;

    return mobileByAgent || mobileBySize;
  };

  useEffect(() => {
    // 첫 번째 단계: 2초 동안 랜딩 페이지 표시
    const firstTimer = setTimeout(() => {
      setAnimationStage("transition");
    }, 2000);

    // 두 번째 단계: 1초 동안 전환 애니메이션
    const secondTimer = setTimeout(() => {
      setAnimationStage("final");
      setShowLanding(false);
    }, 3000);

    // 세 번째 단계: 애니메이션 완료 후 2초 뒤 기기 타입에 따라 리디렉션
    const redirectTimer = setTimeout(() => {
      // 로그인 상태 확인 로직도 추가할 수 있음
      const mobile = isMobile();

      if (mobile) {
        // 모바일 사용자는 '/'에 그대로 유지 (현재 페이지)
        console.log("모바일 사용자 감지됨: 홈페이지 유지");
      } else {
        // 데스크톱 사용자는 '/main'으로 리디렉션
        console.log("데스크톱 사용자 감지됨: /main으로 리디렉션");
        setIsRedirecting(true);
        router.push("/main");
      }
    });

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  const goToLogin = (): void => {
    router.push("/login");
  };

  const goToSignUp = (): void => {
    router.push("/signup");
  };

  // 전환 효과를 위한 클래스 계산
  const containerClass =
    animationStage === "initial"
      ? "fixed inset-0 overflow-hidden bg-gradient-to-br from-[#0FC9BA] to-[#0AB3A5]"
      : animationStage === "transition"
        ? "fixed inset-0 overflow-hidden bg-gradient-to-br from-[#0FC9BA] to-[#0AB3A5] transition-all duration-1000 opacity-50"
        : "fixed inset-0 overflow-hidden bg-gradient-to-b from-[#F0FDFB] to-white";

  const logoStyle = {
    transform: animationStage === "initial" ? "scale(1)" : "scale(0.6)",
    opacity: animationStage === "transition" ? 0.8 : 1,
    transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const textStyle = {
    opacity: animationStage === "transition" ? 0 : 1,
    transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  // 리디렉션 중일 때 로딩 표시
  if (isRedirecting) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#F0FDFB] to-white">
        <p className="text-gray-700 text-lg">데스크톱 버전으로 이동 중...</p>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <main className="flex flex-col items-center justify-center h-full">
        {showLanding ? (
          // 랜딩 페이지 콘텐츠
          <div className="flex flex-col items-center w-full max-w-[280px]" style={logoStyle}>
            <div
              className="self-start text-white text-xl font-medium tracking-wide"
              style={textStyle}
            >
              새로운
            </div>
            <div className="self-start text-white text-xl mb-4" style={textStyle}>
              <span className="font-bold text-2xl">발자국</span> 금융 라이프
            </div>
            <div className="relative w-full">
              <Image
                src={landingLogo}
                alt="랜딩 로고"
                width={280}
                height={280}
                className="mb-8 drop-shadow-lg"
              />
            </div>
          </div>
        ) : (
          // 메인 페이지 콘텐츠
          <div className="flex flex-col items-center w-full max-w-sm px-6 py-8">
            {/* 메인 로고 컨테이너 */}
            <div className="relative mb-12">
              <Image
                src={awoologo}
                alt="awoo로고"
                className="drop-shadow-sm"
                width={280}
                height={280}
              />
            </div>

            {/* 텍스트 섹션 */}
            <div className="text-center mb-12">
              <p className="text-gray-700 text-lg font-medium">
                새로운 <span className="text-[#0FC9BA] font-bold">발자국</span> 금융 라이프를
              </p>
              <p className="text-gray-700 text-lg font-medium">
                <span className="text-[#0FC9BA] font-bold">AwOO</span>와 함께 시작해보세요
              </p>
            </div>

            {/* 카드 컨테이너 */}
            <div className="w-full max-w-[290px] bg-white p-8 rounded-3xl shadow-lg border border-teal-50 relative">
              {/* 로그인 버튼 */}
              <div className="mb-7">
                <Button
                  text="로그인 하러가기"
                  onClick={goToLogin}
                  className="w-full py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#0AB3A5]"
                />
              </div>

              {/* 추가 링크들 */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">처음이신가요?</span>
                <span
                  className="text-[#0FC9BA] font-semibold cursor-pointer hover:underline"
                  onClick={goToSignUp}
                >
                  회원가입
                </span>
              </div>
            </div>

            {/* 하단 텍스트 */}
            <p className="mt-12 text-gray-400 text-xs">© 2025 AwOO Financial Services</p>
          </div>
        )}
      </main>
    </div>
  );
}
