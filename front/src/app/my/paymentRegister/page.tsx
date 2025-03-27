"use client";

import TopBar from "../../../common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import InfoTyping from "./components/InfoTyping";
import { useRouter } from "next/navigation";

export default function PaymentRegister() {
  const router = useRouter();

  // 멍Pay 등록 완료 처리
  const handleRegistrationComplete = (data: { name: string; phoneNumber: string }) => {
    console.log("멍Pay 등록 정보:", data);

    // 실제 구현에서는 인증, API 호출 등 추가 로직
    alert("인증번호가 발송되었습니다.");

    // 다음 단계로 이동 (예: 인증번호 입력 페이지)
    // router.push("/payment/register/verify");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBar title="멍Pay" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      <div className="pt-14">
        <InfoTyping onComplete={handleRegistrationComplete} />
      </div>
    </div>
  );
}
