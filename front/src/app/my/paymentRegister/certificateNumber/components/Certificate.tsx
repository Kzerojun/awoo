"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Certificate() {
  const router = useRouter();
  const [certificateNumber, setCertificateNumber] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180); // 3분

  // 남은 시간 카운트다운
  useEffect(() => {
    if (remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  // 남은 시간을 분:초 형식으로 표시
  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 키보드 표시 여부 감지
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const threshold = window.innerWidth < 768 ? 550 : 700;
      setIsKeyboardVisible(windowHeight < threshold);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 인증번호 입력 처리
  const handleCertificateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 허용 (최대 6자리)
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setCertificateNumber(value);
  };

  // 인증 확인 처리
  const handleVerify = () => {
    if (certificateNumber.length !== 6) {
      alert("6자리 인증번호를 입력해주세요.");
      return;
    }

    // 실제 구현에서는 API 호출로 인증번호 검증
    console.log("인증번호 확인:", certificateNumber);

    // 인증 성공 시 다음 단계로 이동
    alert("인증이 완료되었습니다.");
    router.push("/my/paymentRegister/paymentPassword"); // 완료 페이지로 이동
  };

  // 테스트용 SMS 인증번호
  const testSmsNumber = "123456";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar title="멍Pay" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      <div className="pt-14 flex flex-col min-h-[calc(70vh-56px)]">
        {/* 입력 폼 - 상단 고정 */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">인증번호를 입력해 주세요</h2>
          <input
            type="text"
            value={certificateNumber}
            onChange={handleCertificateChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="인증번호 6자리"
            autoFocus
            inputMode="numeric"
          />

          {/* 남은 시간 표시 */}
          {remainingTime > 0 && (
            <p className="mt-2 text-right text-sm text-gray-500">남은 시간: {formatTime()}</p>
          )}

          {/* 시간 만료 메시지 */}
          {remainingTime <= 0 && (
            <p className="mt-2 text-right text-sm text-red-500">
              인증 시간이 만료되었습니다. 다시 시도해주세요.
            </p>
          )}
        </div>

        {/* 버튼 영역 - 키보드에 따라 위치 조정 */}
        <div
          className={`p-4 ${isKeyboardVisible ? "mt-auto" : "flex-grow flex items-center justify-center"}`}
        >
          <button
            onClick={handleVerify}
            disabled={certificateNumber.length !== 6 || remainingTime <= 0}
            className={`w-[180px] py-3 rounded-full ${
              certificateNumber.length === 6 && remainingTime > 0
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-500"
            } font-medium transition-colors`}
          >
            확인
          </button>
        </div>

        {/* 테스트용 SMS 메시지 표시 (실제 앱에서는 실제 SMS 수신됨) */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-2 text-center text-sm">
          메세지에서
          <br />
          {testSmsNumber}
        </div>
      </div>
    </div>
  );
}
