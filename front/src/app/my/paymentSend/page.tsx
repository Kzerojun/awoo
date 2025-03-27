"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import SendBankInfo from "./components/SendBankInfo";
import SendAmountModal from "./components/SendAmountModal";
import SendConfirmModal from "./components/SendConfirmModal";

export default function PaymentSend() {
  const router = useRouter();
  const [showAmountModal, setShowAmountModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [bankInfo, setBankInfo] = useState<{ bank: string; accountNumber: string } | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(2999000); // 현재 잔액 - 실제로는 API에서 가져와야 함

  // 계좌 정보 입력 완료 처리
  const handleBankInfoComplete = (data: { bank: string; accountNumber: string }) => {
    console.log("계좌 정보:", data);

    // 은행 정보 저장
    setBankInfo(data);

    // 금액 입력 모달 표시
    setShowAmountModal(true);
  };

  // 송금 금액 입력 완료 처리
  const handleAmountComplete = (amount: number) => {
    console.log("송금 금액:", amount);
    setAmount(amount);

    // 금액 모달 닫고 확인 모달 열기
    setShowAmountModal(false);
    setShowConfirmModal(true);
  };

  // 최종 송금 처리
  const handleSendComplete = () => {
    console.log("송금 정보:", { ...bankInfo, amount });

    // 실제로는 API 호출로 송금 처리 후 잔액 업데이트
    const newBalance = balance - amount;
    setBalance(newBalance);

    // 송금 완료 페이지로 이동하면서 필요한 정보 URL 파라미터로 전달
    if (bankInfo) {
      router.push(
        `/my/paymentSend/completeSend?amount=${amount}&balance=${newBalance}&bank=${bankInfo.bank}&accountNumber=${bankInfo.accountNumber}&receiverName=받는분`
      );
    }

    // 송금 완료 후 모달 닫기
    setShowConfirmModal(false);
  };

  // 금액 수정 처리
  const handleEditAmount = () => {
    // 확인 모달을 닫고 금액 입력 모달을 다시 엶
    setShowConfirmModal(false);
    setShowAmountModal(true);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar title="송금" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      <div className="pt-14 flex-1 flex flex-col">
        <SendBankInfo onComplete={handleBankInfoComplete} />

        {/* 송금 금액 입력 모달 */}
        {bankInfo && (
          <SendAmountModal
            isOpen={showAmountModal}
            onClose={() => setShowAmountModal(false)}
            onComplete={handleAmountComplete}
            bankInfo={bankInfo}
          />
        )}

        {/* 송금 확인 모달 */}
        {bankInfo && (
          <SendConfirmModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={handleSendComplete}
            onEdit={handleEditAmount}
            amount={amount}
            bankInfo={bankInfo}
          />
        )}
      </div>
    </div>
  );
}
