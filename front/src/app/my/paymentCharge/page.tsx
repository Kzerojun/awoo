"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "../../../common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import ChargeAmount from "./components/ChargeAmount";
import ConfirmChargePassword from "./components/ConfirmChargePassword";

export default function PaymentCharge() {
  const [amount, setAmount] = useState<string>("");
  const [balance, setBalance] = useState<number>(3000000); // 기본 잔액 설정
  const [selectedAccount, setSelectedAccount] = useState<string>("기업 1767"); // 기본 계좌 설정
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const router = useRouter();

  // 금액 입력 처리
  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  // 충전하기 버튼 처리
  const handleCharge = () => {
    if (!amount || Number(amount) <= 0) {
      alert("충전 금액을 입력해주세요.");
      return;
    }

    // 비밀번호 입력 모달 표시
    setIsPasswordModalOpen(true);
  };

  // 비밀번호 모달 닫기
  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  // handleConfirmCharge 함수를 수정합니다
  const handleConfirmCharge = () => {
    // 금액과 잔액 계산 (문자열을 숫자로 정확하게 변환)
    const numAmount = parseInt(amount);
    const newBalance = balance + numAmount;

    // 모달 닫기
    setIsPasswordModalOpen(false);

    // 디버깅을 위한 로그
    console.log("충전 정보:", {
      amount: numAmount,
      balance: newBalance,
      account: selectedAccount,
    });

    // ChargeDone 페이지로 이동 (URL 파라미터로 필요한 정보 전달)
    router.push(
      `/my/paymentCharge/chargeDone?amount=${numAmount}&balance=${newBalance}&account=${encodeURIComponent(selectedAccount)}`
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar title="충전" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col pt-14 px-4">
        <div className="flex-1">
          {/* 충전 금액 입력 컴포넌트 */}
          <ChargeAmount
            amount={amount}
            onAmountChange={handleAmountChange}
            balance={balance}
            selectedAccount={selectedAccount}
            onCharge={handleCharge}
          />
        </div>
      </div>

      {/* 비밀번호 확인 모달 */}
      <ConfirmChargePassword
        isOpen={isPasswordModalOpen}
        onClose={handleClosePasswordModal}
        onConfirm={handleConfirmCharge}
        amount={amount}
      />
    </div>
  );
}
