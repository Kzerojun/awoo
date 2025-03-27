"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import Password from "./components/Password";

export default function PaymentPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: 비밀번호 설정, 2: 비밀번호 확인
  const [firstPassword, setFirstPassword] = useState("");

  // 첫 번째 비밀번호 설정 완료 처리
  const handleFirstPasswordComplete = (password: string) => {
    setFirstPassword(password);
    setStep(2);
  };

  // 두 번째 비밀번호 확인 완료 처리
  const handleSecondPasswordComplete = (password: string) => {
    if (password === firstPassword) {
      // 비밀번호 일치 시 처리
      console.log("비밀번호 설정 완료:", password);

      // API 호출 등 비밀번호 저장 로직
      alert("멍Pay 비밀번호가 설정되었습니다.");

      // 다음 페이지로 이동 (예: 완료 페이지)
      router.push("/my/paymentRegister/signupDone");
    } else {
      // 비밀번호 불일치 시 처리
      alert("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
      setStep(1); // 처음부터 다시 시작
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar title="멍Pay" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      <div className="pt-1">
        {step === 1 ? (
          // 비밀번호 설정 단계 (key 속성 추가로 컴포넌트 강제 리마운트)
          <Password
            key="setup"
            title="멍Pay에서 쓸"
            subtitle="비밀번호를 등록해 주세요"
            onComplete={handleFirstPasswordComplete}
          />
        ) : (
          // 비밀번호 확인 단계
          <Password
            key="confirm"
            title="같은 비밀번호를"
            subtitle="한번 더 입력해 주세요"
            isConfirm={true}
            onComplete={handleSecondPasswordComplete}
          />
        )}
      </div>
    </div>
  );
}
