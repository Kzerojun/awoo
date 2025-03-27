"use client";

import { useRouter } from "next/navigation";
import TopBar from "@/common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import BankInfoTyping from "./components/BankInfoTyping";

export default function AccountConnect() {
  const router = useRouter();

  // 계좌 정보 입력 완료 처리
  const handleBankInfoComplete = (data: { bank: string; accountNumber: string }) => {
    console.log("계좌 정보:", data);

    // 실제 구현에서는 API 호출로 계좌 인증
    alert("계좌 인증이 요청되었습니다.");

    // 인증 완료 시 다음 페이지로 이동
    // 예: 계좌 인증 확인 페이지 또는 완료 페이지
    router.push("/my/paymentRegister/accountCertificate");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar title="계좌 연결" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      <div className="pt-14 flex-1 flex flex-col">
        <BankInfoTyping onComplete={handleBankInfoComplete} />
      </div>
    </div>
  );
}
