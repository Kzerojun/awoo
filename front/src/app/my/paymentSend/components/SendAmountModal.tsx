"use client";

import { useState, useEffect, useRef } from "react";
// SendConfirmModal import 제거

interface SendAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (amount: number) => void;
  bankInfo: {
    bank: string;
    accountNumber: string;
  };
}

export default function SendAmountModal({
  isOpen,
  onClose,
  onComplete,
  bankInfo,
}: SendAmountModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [balance] = useState<number>(2000000); // 임시 잔액 (API에서 가져와야 함)
  // 확인 모달 상태는 필요 없어짐
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달이 닫힐 때 금액 초기화
  useEffect(() => {
    if (!isOpen) {
      setAmount("");
    }
  }, [isOpen]);

  // 숫자 입력 처리
  const handleNumberPress = (num: number) => {
    if (amount === "0") {
      setAmount(num.toString());
    } else {
      // 최대 10자리까지만 입력 가능
      if (amount.length < 10) {
        setAmount((prev) => prev + num);
      }
    }
  };

  // 백스페이스 처리
  const handleBackspace = () => {
    if (amount.length > 0) {
      setAmount((prev) => prev.slice(0, -1));
    }
  };

  // 전체 지우기
  const handleClear = () => {
    setAmount("");
  };

  // 금액 형식화 (천 단위 콤마)
  const formatAmount = (value: string): string => {
    if (!value) return "0";
    return Number(value).toLocaleString();
  };

  // 확인 버튼 처리 - 바로 완료 처리
  const handleConfirm = () => {
    if (!amount || Number(amount) <= 0) {
      alert("송금 금액을 입력해주세요.");
      return;
    }

    if (Number(amount) > balance) {
      alert("잔액이 부족합니다.");
      return;
    }

    // 바로 완료 처리하고 모달 닫기
    onComplete(Number(amount));
  };

  // 확인 모달 삭제로 이 함수도 필요 없어짐

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[100] flex flex-col" onClick={onClose}>
        <div
          ref={modalRef}
          className="mt-auto bg-white rounded-t-3xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 수신자 정보 */}
          <div className="p-6 bg-white">
            <p className="text-gray-600 mb-1">농협 {bankInfo.accountNumber}</p>

            {/* 금액 표시 */}
            <div className="flex items-center justify-between mt-2 mb-6">
              <h2 className="text-4xl font-bold">{formatAmount(amount)} 원</h2>
              <button onClick={handleClear} className="p-1 rounded-full border border-gray-300">
                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* 잔액 정보 */}
            <div className="flex flex-col text-sm mt-4">
              <div className="py-2">
                <p>수수료 무료</p>
              </div>
              <div className="border-t border-dashed border-gray-300"></div>
              <div className="flex items-center text-gray-600 justify-between py-2">
                <p>송금 한도</p>
                <p className="font-medium">{balance.toLocaleString()}원</p>
              </div>
            </div>

            {/* 송금 버튼 */}
            <button
              onClick={handleConfirm}
              disabled={!amount || Number(amount) <= 0}
              className={`mt-4 w-full py-2 rounded-2xl ${
                amount && Number(amount) > 0
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-500"
              } text-xl transition-colors`}
            >
              확인
            </button>
          </div>

          {/* 숫자 키패드 */}
          <div className="border-t border-gray-200">
            {/* 1-9 숫자 키패드 그리드 */}
            <div className="grid grid-cols-3">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberPress(num)}
                  className="py-5 border-r border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-xl font-medium"
                >
                  {num}
                </button>
              ))}
              {[4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberPress(num)}
                  className="py-5 border-r border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-xl font-medium"
                >
                  {num}
                </button>
              ))}
              {[7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberPress(num)}
                  className="py-5 border-r border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-xl font-medium"
                >
                  {num}
                </button>
              ))}
            </div>

            {/* 하단 버튼 영역 */}
            <div className="grid grid-cols-3">
              <button
                className="py-5 border-r border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                onClick={handleClear}
              >
                전액
              </button>
              <button
                onClick={() => handleNumberPress(0)}
                className="py-5 border-r border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-xl font-medium"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="py-5 hover:bg-gray-50 active:bg-gray-100 flex justify-center items-center"
              >
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                  />
                </svg>
              </button>
            </div>

            {/* 추가된 하단 여백과 구분선 */}
            <div className="border-t border-gray-200 py-4"></div>
          </div>
        </div>
      </div>

      {/* 확인 모달 제거 */}
    </>
  );
}
