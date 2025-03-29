"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyPhoneAuth } from "@/api/payment/payment";
import { toast } from "react-toastify";

export default function Certificate() {
  const router = useRouter();
  const [certificateNumber, setCertificateNumber] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180); // 3분
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이전 화면에서 입력한 전화번호 저장
  const [phoneNumber, setPhoneNumber] = useState("");

  // 세션 스토리지에서 전화번호 가져오기
  useEffect(() => {
    const phone = sessionStorage.getItem("verification_phone");
    if (phone) {
      setPhoneNumber(phone);
      console.log("저장된 전화번호 불러옴:", phone);
    } else {
      console.error("전화번호 정보를 찾을 수 없습니다");
      toast.error("전화번호 정보를 찾을 수 없습니다. 이전 단계로 돌아가주세요.");
    }
  }, []);

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

  // 인증번호 확인 요청
  const handleVerify = async () => {
    if (certificateNumber.length !== 6) {
      toast.error("6자리 인증번호를 입력해주세요.");
      return;
    }

    if (remainingTime <= 0) {
      toast.error("인증 시간이 만료되었습니다. 다시 시도해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 전화번호 확인
      if (!phoneNumber) {
        toast.error("전화번호 정보가 없습니다. 이전 단계로 돌아가주세요.");
        return;
      }

      // 인증번호 확인 API 호출 및 응답 저장
      const response = await verifyPhoneAuth({
        phone: phoneNumber,
        authCode: certificateNumber,
      });

      console.log("인증번호 확인 성공", response);

      // 응답에서 auth-token 추출하여 저장
      if (response && response.response) {
        // 응답 구조에 따라 경로 조정 필요
        const authToken = response.response.token || response.response.authToken || "";

        if (authToken) {
          sessionStorage.setItem("phone_auth_token", authToken);
          console.log("인증 토큰 저장됨:", authToken);
        } else {
          console.warn("응답에서 인증 토큰을 찾을 수 없습니다");
        }
      }

      toast.success("휴대폰 인증이 완료되었습니다.");

      // 인증 성공 시 세션 데이터 유지 (비밀번호 설정 완료 후 제거)
      sessionStorage.setItem("phone_verified", "true");

      // 인증 성공 시 다음 단계(비밀번호 설정)로 이동
      router.push("/my/paymentRegister/paymentPassword");
    } catch (error) {
      console.error("인증번호 확인 실패:", error);
      toast.error("인증번호가 올바르지 않습니다. 다시 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 인증번호 재전송 처리
  const handleResendCode = async () => {
    // 여기에 인증번호 재전송 로직 구현
    toast.info("인증번호가 재전송되었습니다.");
    // 타이머 재설정
    setRemainingTime(180);
  };

  return (
    <div className="flex flex-col min-h-[calc(70vh-56px)]">
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
          disabled={isSubmitting}
        />

        {/* 남은 시간 표시 */}
        <div className="flex justify-between mt-2">
          {remainingTime > 0 ? (
            <p className="text-sm text-gray-500">남은 시간: {formatTime()}</p>
          ) : (
            <p className="text-sm text-red-500">인증 시간이 만료되었습니다.</p>
          )}

          {/* 인증번호 재전송 버튼 */}
          <button
            onClick={handleResendCode}
            className="text-sm text-teal-500"
            disabled={isSubmitting}
          >
            인증번호 재전송
          </button>
        </div>
      </div>

      {/* 버튼 영역 - 키보드에 따라 위치 조정 */}
      <div
        className={`p-4 ${isKeyboardVisible ? "mt-auto" : "flex-grow flex items-center justify-center"}`}
      >
        <button
          onClick={handleVerify}
          disabled={certificateNumber.length !== 6 || remainingTime <= 0 || isSubmitting}
          className={`w-[180px] py-3 rounded-full ${
            certificateNumber.length === 6 && remainingTime > 0 && !isSubmitting
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-500"
          } font-medium transition-colors`}
        >
          {isSubmitting ? "확인 중..." : "확인"}
        </button>
      </div>
    </div>
  );
}
