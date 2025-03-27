"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopBar from "@/common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";

export default function CompleteSend() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 파라미터에서 송금 정보 가져오기
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [receiverName, setReceiverName] = useState<string>("");
  const [bank, setBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");

  // 페이지 로드시 URL 파라미터 읽기
  useEffect(() => {
    // URL 파라미터로 전달된 데이터 읽기
    const amountParam = searchParams.get("amount");
    const balanceParam = searchParams.get("balance");
    const receiverNameParam = searchParams.get("receiverName");
    const bankParam = searchParams.get("bank");
    const accountNumberParam = searchParams.get("accountNumber");

    // 파라미터가 존재하면 상태 업데이트
    if (amountParam) setAmount(parseInt(amountParam));
    if (balanceParam) setBalance(parseInt(balanceParam));
    if (receiverNameParam) setReceiverName(receiverNameParam);
    if (bankParam) setBank(bankParam);
    if (accountNumberParam) setAccountNumber(accountNumberParam);

    // 필수 파라미터가 없으면 홈으로 리다이렉트
    if (!amountParam || !bankParam || !accountNumberParam) {
      console.error("필수 파라미터가 누락되었습니다");
      // router.push("/my"); // 실제 구현에서는 필요에 따라 주석 해제
    }
  }, [searchParams, router]);

  // 현재 날짜와 시간 생성
  const now = new Date();
  const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  // 확인 버튼 처리
  const handleConfirm = () => {
    router.push("/my"); // 홈 화면으로 이동
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar title="송금" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />
      {/* 메인 콘텐츠 */}
      <div className="flex-1 p-6 flex flex-col pt-14">
        {/* 송금 완료 표시 */}
        <div className="mb-4 mt-20">
          <p className="text-[#0FC9BA] font-medium">멍Pay</p>
          <h2 className="text-[43px] font-bold my-2">{amount.toLocaleString()} 원</h2>
          <p className="text-gray-600">송금완료</p>
        </div>

        {/* 송금 정보 */}
        <div className="mt-12 ">
          <div className="flex justify-between items-center py-3">
            <p className="text-gray-600 text-lg font-bold">{receiverName || "받는분"}</p>
            <p className="text-lg">
              {bank} {accountNumber}
            </p>
          </div>
          <div className="border-t border-dashed border-gray-300"></div>
          <div className="flex justify-between items-center py-3">
            <p className="text-gray-600">거래 후 잔액</p>
            <p className="font-medium">{balance.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="p-4 bg-[#0FC9BA]">
        <button onClick={handleConfirm} className="w-full py-3 text-white text-center text-xl">
          확인
        </button>
      </div>
    </div>
  );
}
