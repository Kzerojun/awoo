"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestOneWonTransfer } from "@/api/payment/payment";
import { toast } from "react-toastify";
import BankSelectorModal from "../../components/BankSelectorModal";

interface BankInfoTypingProps {
  onComplete?: (data: { bank: string; accountNumber: string }) => void;
}

export default function BankInfoTyping({ onComplete }: BankInfoTypingProps) {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [showBankSelector, setShowBankSelector] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 계좌번호 형식화 (하이픈 추가 등)
  const formatAccountNumber = (value: string) => {
    // 숫자만 허용
    const numbers = value.replace(/[^0-9]/g, "");

    // 하이픈 추가 로직 (은행별로 다를 수 있음)
    // 여기서는 일반적인 형태로 적용
    let formatted = "";
    formatted = numbers;

    return formatted;
  };

  // 계좌번호 입력 처리
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAccountNumber(e.target.value);
    setAccountNumber(formatted);
  };

  // 계좌 인증 요청 (1원 송금)
  const handleVerifyAccount = async () => {
    if (!selectedBank) {
      toast.error("은행을 선택해주세요.");
      return;
    }

    if (accountNumber.length < 10) {
      toast.error("올바른 계좌번호를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1원 송금 API 호출
      const response = await requestOneWonTransfer({ accountNo: accountNumber });

      console.log("1원 송금 요청 성공:", response);
      toast.success("계좌로 1원이 송금되었습니다. 입금자명을 확인해주세요.");

      // 계좌번호 세션 스토리지에 저장 (인증에 필요)
      sessionStorage.setItem("verification_account", accountNumber);
      sessionStorage.setItem("verification_bank", selectedBank);

      // 완료 콜백 호출
      if (onComplete) {
        onComplete({ bank: selectedBank, accountNumber });
      }

      // 인증 페이지로 이동
      router.replace("/my/paymentRegister/accountCertificate");
    } catch (error) {
      console.error("1원 송금 요청 실패:", error);
      toast.error("계좌 인증 요청에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 은행 선택 처리
  const handleSelectBank = (bank: string) => {
    setSelectedBank(bank);
  };

  return (
    <div className="flex flex-col p-4 bg-white h-full">
      {/* 은행 선택 영역 - 박스 스타일 */}
      <div className="mb-6 relative">
        <label className="block text-gray-500 mb-1 text-sm">은행</label>
        <div
          className="w-full border border-gray-300 rounded-md p-3 flex justify-between items-center cursor-pointer"
          onClick={() => setShowBankSelector(true)}
        >
          <span className={selectedBank ? "text-black font-medium" : "text-gray-400"}>
            {selectedBank || "은행을 선택해주세요"}
          </span>
          <div className="flex flex-col">
            <span className="h-3 text-[10px] text-gray-500">▲</span>
            <span className="h-3 text-[10px] text-gray-500">▼</span>
          </div>
        </div>
      </div>

      {/* 계좌번호 입력 영역 - 박스 스타일 */}
      <div className="mb-10">
        <label className="block text-gray-500 mb-1 text-sm">계좌번호</label>
        <input
          type="text"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
          placeholder="계좌번호를 입력해주세요"
          disabled={isSubmitting}
        />
      </div>

      {/* 버튼 영역 */}
      <div className="mt-[60px] flex justify-center">
        <button
          onClick={handleVerifyAccount}
          disabled={!selectedBank || accountNumber.length < 10 || isSubmitting}
          className={`w-[180px] py-3 rounded-full ${
            selectedBank && accountNumber.length >= 10 && !isSubmitting
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-500"
          } font-medium transition-colors`}
        >
          {isSubmitting ? "처리 중..." : "계좌인증요청"}
        </button>
      </div>

      {/* 은행 선택 모달 컴포넌트 */}
      <BankSelectorModal
        isOpen={showBankSelector}
        onClose={() => setShowBankSelector(false)}
        onSelectBank={handleSelectBank}
      />
    </div>
  );
}
