"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import Password from "./components/Password";
import { setPaymentPassword } from "@/api/payment/payment";

export default function PaymentPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: 비밀번호 설정, 2: 비밀번호 확인
  const [firstPassword, setFirstPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 인증 상태 확인
  useEffect(() => {
    const isVerified = sessionStorage.getItem("phone_verified");

    if (!isVerified) {
      alert("휴대폰 인증이 필요합니다.");
      router.push("/my/paymentRegister");
    }
  }, [router]);

  // 첫 번째 비밀번호 설정 완료 처리
  const handleFirstPasswordComplete = (password: string) => {
    setFirstPassword(password);
    setStep(2);
  };

  // 두 번째 비밀번호 확인 완료 처리
  const handleSecondPasswordComplete = async (password: string) => {
    if (password !== firstPassword) {
      // 비밀번호 불일치 시 처리
      alert("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
      setStep(1); // 처음부터 다시 시작
      return;
    }

    setIsSubmitting(true);

    try {
      // 멍페이 비밀번호 설정 API 호출
      await setPaymentPassword({ password });

      console.log("멍페이 비밀번호 설정 완료");
      alert("멍페이 비밀번호가 설정되었습니다.");

      // 완료 페이지로 이동
      router.push("/my/paymentRegister/signupDone");
    } catch (error) {
      console.error("멍페이 비밀번호 설정 실패:", error);
      alert("비밀번호 설정에 실패했습니다. 다시 시도해주세요.");
      // 오류 발생 시 첫 단계로 돌아가기
      setStep(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonTopBar title="멍Pay" rightAction="bell" />

      <div className="pt-1">
        {step === 1 ? (
          // 비밀번호 설정 단계 (key 속성 추가로 컴포넌트 강제 리마운트)
          <Password
            key="setup"
            title="멍Pay에서 쓸"
            subtitle="비밀번호를 등록해 주세요"
            onComplete={handleFirstPasswordComplete}
            disabled={isSubmitting}
          />
        ) : (
          // 비밀번호 확인 단계
          <Password
            key="confirm"
            title="같은 비밀번호를"
            subtitle="한번 더 입력해 주세요"
            isConfirm={true}
            onComplete={handleSecondPasswordComplete}
            disabled={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
