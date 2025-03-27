"use client";

import { useState, useRef, useEffect } from "react";
import ChargeNumericKeypad from "./ChargeNumericKeypad";

interface ChargeAmountProps {
  amount: string;
  onAmountChange: (value: string) => void;
  balance: number;
  selectedAccount: string;
  onCharge: () => void;
}

export default function ChargeAmount({
  amount,
  onAmountChange,
  balance,
  selectedAccount,
  onCharge,
}: ChargeAmountProps) {
  const [isKeypadOpen, setIsKeypadOpen] = useState<boolean>(false);

  // 숫자 입력 처리
  const handleNumberPress = (num: number) => {
    // 만/오만/십만원 빠른 선택 옵션 처리
    if (num >= 10000) {
      const newAmount = (Number(amount || "0") + num).toString();
      onAmountChange(newAmount);
      return;
    }

    // 일반 숫자 입력 처리
    if (amount === "0") {
      onAmountChange(num.toString());
    } else {
      // 최대 10자리까지만 입력 가능
      if (amount.length < 10) {
        onAmountChange(amount + num);
      }
    }
  };

  // 백스페이스 처리
  const handleBackspace = () => {
    if (amount.length > 0) {
      onAmountChange(amount.slice(0, -1));
    }
  };

  // 전체 지우기
  const handleClear = () => {
    onAmountChange("");
  };

  // 키패드 닫기
  const handleCloseKeypad = () => {
    setIsKeypadOpen(false);
  };

  // 금액 형식화 (천 단위 콤마)
  const formatAmount = (value: string): string => {
    if (!value) return "0";
    return Number(value).toLocaleString();
  };

  return (
    <div className="flex flex-col w-full">
      {/* 금액 입력 필드 */}
      <div className="mt-4 mb-6">
        <div
          className="border border-gray-300 rounded-lg p-4 cursor-pointer"
          onClick={() => setIsKeypadOpen(true)}
        >
          <div className="text-gray-500 text-sm mb-2">충전금액</div>
          <div className="flex items-center">
            <span className="text-2xl">{formatAmount(amount)}원</span>
            <div
              className="ml-auto cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              {amount && (
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 충전 정보 */}
      <div className="border-t border-dashed border-gray-300 pt-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">충전 후 멍페이 잔액</span>
          <span className="font-medium">{(balance + Number(amount || 0)).toLocaleString()}원</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">충전 계좌</span>
          <div className="flex items-center">
            <span className="font-medium">{selectedAccount}</span>
            <svg className="h-4 w-4 ml-1 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 충전하기 버튼 */}
      <button
        onClick={onCharge}
        disabled={!amount || Number(amount) <= 0}
        className={`mt-3 w-full py-3 rounded-lg ${
          amount && Number(amount) > 0 ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-500"
        } font-medium text-lg transition-colors`}
      >
        충전하기
      </button>

      {/* 키패드 모달 - 화면 하단에 고정 */}
      {isKeypadOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-[100]">
          <div className="bg-white shadow-t border-gray-200">
            {/* 숫자 키패드 컴포넌트 */}
            <ChargeNumericKeypad
              onNumberPress={handleNumberPress}
              onBackspace={handleBackspace}
              onClose={handleCloseKeypad}
            />
          </div>
        </div>
      )}
    </div>
  );
}
