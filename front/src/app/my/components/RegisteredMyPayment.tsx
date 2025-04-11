"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPaymentBalance, getPaymentAccounts } from "@/api/payment/payment";

export default function RegisteredMyPayment() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [linkedAccount, setLinkedAccount] = useState(""); // 연결된 계좌 정보

  // 멍페이 잔액 조회
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setIsLoading(true);
        const balanceResponse = await getPaymentBalance();
        // API 응답에서 잔액 가져오기
        setBalance(balanceResponse.amount || 0);

        // 계좌 정보 조회
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
          }
        } else {
          // 세션 스토리지에서 가져오기 (계좌 연결 시 저장했다면)
          const bank = sessionStorage.getItem("verification_bank");
          const account = sessionStorage.getItem("verification_account");
          if (bank && account) {
            const maskedAccount = maskAccountNumber(account);
            setLinkedAccount(`${bank} ${maskedAccount}`);
          }
        }
      } catch (error) {
        console.error("데이터 조회 실패:", error);
        // 오류 시 기본값 사용
        setBalance(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []);

  // 계좌번호 마스킹 함수
  const maskAccountNumber = (accountNo: string) => {
    if (!accountNo || accountNo.length < 6) return accountNo;
    const length = accountNo.length;
    return accountNo.substring(0, 2) + "*".repeat(length - 4) + accountNo.substring(length - 2);
  };

  // 금액 포맷팅 함수
  const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChargeClick = () => {
    router.push("/my/paymentCharge");
  };

  const handleSendClick = () => {
    router.push("/my/paymentSend");
  };

  return (
    <div className="px-1 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-teal-500 mr-1 font-bold text-[16px]">멍Pay</span>
          <span className="ml-2 font-bold text-[15px]">
            {isLoading ? "로딩 중..." : `${formatAmount(balance)} `}
            <span className="font-light">원</span>
          </span>
        </div>
        <div className="flex mr-1">
          <button onClick={handleSendClick} className="text-gray-400 mr-2 text-sm">
            송금
          </button>
          <span className="text-gray-300">|</span>
          <button onClick={handleChargeClick} className="text-gray-400 ml-2 text-sm">
            충전
          </button>
        </div>
      </div>
    </div>
  );
}
