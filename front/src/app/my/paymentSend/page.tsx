"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import SendBankInfo from "./components/SendBankInfo";
import SendAmountModal from "./components/SendAmountModal";
import SendConfirmModal from "./components/SendConfirmModal";
import { getPaymentBalance, transferPayment } from "@/api/payment/payment";
import { toast } from "react-toastify";

export default function PaymentSend() {
  const router = useRouter();
  const [showAmountModal, setShowAmountModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [bankInfo, setBankInfo] = useState<{ bank: string; accountNumber: string } | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<number | null>(null);

  // 컴포넌트 마운트 시 잔액 조회
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setIsLoading(true);
        const balanceResponse = await getPaymentBalance();
        setBalance(balanceResponse.amount);
      } catch (error) {
        console.error("잔액 조회 실패:", error);
        toast.error("잔액 정보를 불러오는데 실패했습니다.");
        setBalance(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []);

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
  const handleSendComplete = async (password: string) => {
    if (!bankInfo) return;

    try {
      setIsSending(true);

      // API 호출로 송금 처리
      const response = await transferPayment(amount, bankInfo.accountNumber);

      if (response.success) {
        // 송금 성공
        setTransactionId(response.response.transactionId);

        // 새 잔액 계산 (실제로는 다시 잔액 조회 API를 호출하는 것이 좋을 수 있음)
        const newBalance = balance - amount;
        setBalance(newBalance);

        // 송금 완료 페이지로 이동
        router.push(
          `/my/paymentSend/completeSend?amount=${amount}&balance=${newBalance}&bank=${bankInfo.bank}&accountNumber=${bankInfo.accountNumber}&receiverName=받는분&transactionId=${response.response.transactionId}`
        );
      } else {
        // 송금 실패
        toast.error(response.error?.message || "송금에 실패했습니다.");
      }
    } catch (error) {
      console.error("송금 처리 중 오류 발생:", error);
      toast.error("송금 처리 중 오류가 발생했습니다.");
    } finally {
      setIsSending(false);
      setShowConfirmModal(false);
    }
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
            balance={balance}
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
            isSending={isSending}
          />
        )}
      </div>
    </div>
  );
}
