"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { BellIcon } from "@heroicons/react/24/outline";

import { useAppSelector, useAppDispatch } from "@/lib/store";
import { resetTransferInfo } from "@/lib/slices/transfercheckSlice";

// 실제 컴포넌트 콘텐츠를 별도 컴포넌트로 분리
function CompleteSendContent() {
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [receiverName, setReceiverName] = useState<string>("받는분");
  const [bank, setBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [transactionDate, setTransactionDate] = useState<string>("");
  const router = useRouter();

  // URL 파라미터 처리는 클라이언트 컴포넌트에서만 처리하도록 수정
  useEffect(() => {
    // 현재 날짜와 시간 생성
    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setTransactionDate(formattedDate);

    // URLSearchParams를 사용해 URL 파라미터 가져오기
    const searchParams = new URLSearchParams(window.location.search);

    // 파라미터가 존재하면 상태 업데이트
    const amountParam = searchParams.get("amount");
    const balanceParam = searchParams.get("balance");
    const receiverNameParam = searchParams.get("receiverName");
    const bankParam = searchParams.get("bank");
    const accountNumberParam = searchParams.get("accountNumber");
    const transactionIdParam = searchParams.get("transactionId");

    if (amountParam) setAmount(parseInt(amountParam));
    if (balanceParam) setBalance(parseInt(balanceParam));
    if (receiverNameParam) setReceiverName(receiverNameParam);
    if (bankParam) setBank(bankParam);
    if (accountNumberParam) setAccountNumber(accountNumberParam);
    if (transactionIdParam) setTransactionId(parseInt(transactionIdParam));
  }, []);

  return (
    <div className="flex-1 p-6 flex flex-col pt-14">
      {/* 송금 완료 표시 */}
      <div className="mb-4 mt-20">
        <p className="text-[#0FC9BA] font-medium">멍Pay</p>
        <h2 className="text-[43px] font-bold my-2">{amount.toLocaleString()} 원</h2>
        <p className="text-gray-600">송금완료</p>
      </div>

      {/* 송금 정보 */}
      <div className="mt-12">
        <div className="flex justify-between items-center py-3">
          <p className="text-gray-600 text-lg font-bold">{receiverName}</p>
          <p className="text-lg">
            {bank} {accountNumber}
          </p>
        </div>
        <div className="border-t border-dashed border-gray-300"></div>
        <div className="flex justify-between items-center py-3">
          <p className="text-gray-600">거래 후 잔액</p>
          <p className="font-medium">{balance.toLocaleString()}원</p>
        </div>
        {transactionId && (
          <div className="flex justify-between items-center py-3">
            <p className="text-gray-600">거래 번호</p>
            <p className="font-medium">{transactionId}</p>
          </div>
        )}
        <div className="flex justify-between items-center py-3">
          <p className="text-gray-600">거래 일시</p>
          <p className="font-medium">{transactionDate}</p>
        </div>
      </div>
    </div>
  );
}

// 로딩 상태를 표시할 컴포넌트
function LoadingState() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-10 w-10 text-teal-500 mb-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-gray-600">정보를 불러오는 중...</p>
      </div>
    </div>
  );
}

// 메인 컴포넌트
export default function CompleteSend() {
  const router = useRouter();
  // 출발지 정보 확인 (채팅에서 온 송금 시작 인지 아닌지)
  const transferInfo = useAppSelector((state) => state.transfercheck);
  const dispatch = useAppDispatch();

  // 하단 버튼 부분은 항상 보여줌
  const handleConfirm = () => {
    if (transferInfo.fromChat && transferInfo.chatRoomId) {
      dispatch(resetTransferInfo()); // 상태 초기화
      router.push(
        `/market/chat/${transferInfo.chatRoomId}?usedProductId=${transferInfo.usedProductId}`
      );
    } else {
      router.push("/my"); // 기본 마이페이지로 이동
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <CommonTopBar title="송금" rightAction="bell" />

      {/* Suspense로 감싸서 클라이언트 컴포넌트 렌더링 */}
      <Suspense fallback={<LoadingState />}>
        <CompleteSendContent />
      </Suspense>

      {/* 하단 버튼 - 항상 보여줌 */}
      <div className="p-4 bg-[#0FC9BA]">
        <button onClick={handleConfirm} className="w-full py-3 text-white text-center text-xl">
          확인
        </button>
      </div>
    </div>
  );
}
