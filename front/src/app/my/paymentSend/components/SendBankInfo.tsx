"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BankSelectorModal from "../../paymentRegister/components/BankSelectorModal";

interface SendBankInfoProps {
  onComplete?: (data: { bank: string; accountNumber: string }) => void;
}

export default function SendBankInfo({ onComplete }: SendBankInfoProps) {
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [showBankSelector, setShowBankSelector] = useState<boolean>(false);

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

  // 계좌 인증 요청
  const handleVerifyAccount = () => {
    if (!selectedBank) {
      alert("은행을 선택해주세요.");
      return;
    }

    if (accountNumber.length < 10) {
      alert("올바른 계좌번호를 입력해주세요.");
      return;
    }

    // 완료 콜백 호출
    if (onComplete) {
      onComplete({ bank: selectedBank, accountNumber });
    } else {
      // 기본 동작
      console.log("계좌 정보:", { bank: selectedBank, accountNumber });
      alert("계좌 인증이 요청되었습니다.");
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
      <div className="mb-5">
        <label className="block text-gray-500 mb-1 text-sm">계좌번호</label>
        <input
          type="text"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-teal-500"
          placeholder="계좌번호를 입력해주세요"
        />
      </div>

      {/* 버튼 영역 */}
      <div className="mt-[30px] flex justify-center">
        <button
          onClick={handleVerifyAccount}
          disabled={!selectedBank || accountNumber.length < 10}
          className={`w-[80px] py-3 rounded-xl ${
            selectedBank && accountNumber.length >= 10
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-500"
          } font-medium transition-colors`}
        >
          확인
        </button>
      </div>

      {/* 은행 선택 모달 컴포넌트 - banks 목록 제거 (컴포넌트 내부에서 제공) */}
      <BankSelectorModal
        isOpen={showBankSelector}
        onClose={() => setShowBankSelector(false)}
        onSelectBank={handleSelectBank}
      />
    </div>
  );
}
