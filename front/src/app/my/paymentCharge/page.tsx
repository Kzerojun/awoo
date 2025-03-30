"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "../../../common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";
import ChargeAmount from "./components/ChargeAmount";
import ConfirmChargePassword from "./components/ConfirmChargePassword";
import { getPaymentBalance, getPaymentAccounts, chargePayment } from "@/api/payment/payment";
import { toast } from "react-toastify";

export default function PaymentCharge() {
  const [amount, setAmount] = useState<string>("");
  const [balance, setBalance] = useState<number>(0); // 초기값 0으로 설정
  const [linkedAccount, setLinkedAccount] = useState<string>(""); // 연결된 계좌
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const router = useRouter();

  // 컴포넌트 마운트 시 잔액 및 계좌 정보 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // 잔액 조회
        const balanceResponse = await getPaymentBalance();
        setBalance(balanceResponse.amount || 0);

        // 연결된 계좌 정보 조회
        const accountsResponse = await getPaymentAccounts();

        if (accountsResponse && accountsResponse.response && accountsResponse.response.accountNo) {
          // API 응답 구조에 맞게 처리
          const accountNumber = accountsResponse.response.accountNo;

          // 여기서 은행명도 필요하지만 API에서 제공하지 않는 것 같습니다.
          // 세션 스토리지에서 은행명을 가져오는 방법 사용
          const bankName = sessionStorage.getItem("verification_bank") || "은행";

          if (accountNumber) {
            const maskedAccount = maskAccountNumber(accountNumber);
            setLinkedAccount(`${bankName} ${maskedAccount}`);
          } else {
            setLinkedAccount("연결된 계좌가 없습니다");
          }
        } else {
          // 세션 스토리지에서 가져오기 (계좌 연결 시 저장했다면)
          const bank = sessionStorage.getItem("verification_bank");
          const account = sessionStorage.getItem("verification_account");

          if (bank && account) {
            const maskedAccount = maskAccountNumber(account);
            setLinkedAccount(`${bank} ${maskedAccount}`);
          } else {
            setLinkedAccount("연결된 계좌가 없습니다");
          }
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        toast.error("정보를 불러오는데 실패했습니다.");
        setBalance(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 계좌번호 마스킹 함수
  const maskAccountNumber = (accountNo: string) => {
    if (!accountNo || accountNo.length < 6) return accountNo;
    const length = accountNo.length;
    return accountNo.substring(0, 2) + "*".repeat(length - 4) + accountNo.substring(length - 2);
  };

  // 금액 입력 처리
  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  // 충전하기 버튼 처리
  const handleCharge = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("충전 금액을 입력해주세요.");
      return;
    }

    // 비밀번호 입력 모달 표시
    setIsPasswordModalOpen(true);
  };

  // 비밀번호 모달 닫기
  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  // 충전 확인 처리
  const handleConfirmCharge = async () => {
    if (isCharging) return; // 중복 충전 방지

    try {
      setIsCharging(true);

      // 금액과 잔액 계산 (문자열을 숫자로 정확하게 변환)
      const numAmount = parseInt(amount);
      const newBalance = balance + numAmount;

      // 모달 닫기
      setIsPasswordModalOpen(false);

      // 디버깅을 위한 로그
      console.log("충전 정보:", {
        amount: numAmount,
        balance: newBalance,
        account: linkedAccount,
      });

      // 충전 API 호출
      const response = await chargePayment(numAmount);
      console.log("충전 성공:", response);

      // 충전 완료 후 ChargeDone 페이지로 이동
      router.push(
        `/my/paymentCharge/chargeDone?amount=${numAmount}&balance=${newBalance}&account=${encodeURIComponent(linkedAccount)}`
      );
    } catch (error) {
      console.error("충전 처리 중 오류 발생:", error);
      toast.error("충전 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsCharging(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar title="충전" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col pt-14 px-4">
        <div className="flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">로딩 중...</div>
          ) : (
            <ChargeAmount
              amount={amount}
              onAmountChange={handleAmountChange}
              balance={balance}
              selectedAccount={linkedAccount || "계좌를 연결해주세요"}
              onCharge={handleCharge}
            />
          )}
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
