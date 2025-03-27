"use client";

import { useState, useRef, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import NumericKeypad from "./NumericKeypad";

interface ConfirmPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  receiverInfo: {
    name: string;
    bank: string;
    accountNumber: string;
  };
}

export default function ConfirmPassword({
  isOpen,
  onClose,
  onConfirm,
  amount,
  receiverInfo,
}: ConfirmPasswordProps) {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 비밀번호 원 표시를 위한 배열
  const passwordCircles = Array(6).fill(null);

  // 모달이 열릴 때와 닫힐 때 초기화
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setIsLoading(false);
    }
  }, [isOpen]);

  // 숫자 입력 처리
  const handleNumberPress = (num: number) => {
    if (password.length < 6) {
      const newPassword = password + num;
      setPassword(newPassword);

      // 6자리 다 입력하면 자동으로 확인 처리
      if (newPassword.length === 6) {
        handleConfirm(newPassword);
      }
    }
  };

  // 백스페이스 처리
  const handleBackspace = () => {
    if (password.length > 0) {
      setPassword((prev) => prev.slice(0, -1));
    }
  };

  // 전체 지우기
  const handleClear = () => {
    setPassword("");
  };

  // 키패드 재배열 처리 - NumericKeypad 내부에서 처리하므로 빈 함수로 유지
  const handleRearrange = () => {
    // 이 함수는 NumericKeypad 내부에서 처리
  };

  // 확인 버튼 처리
  const handleConfirm = (pwd: string) => {
    setIsLoading(true);

    // 실제로는 API 호출로 비밀번호 검증 필요
    setTimeout(() => {
      setIsLoading(false);

      // 먼저 onConfirm 콜백 호출 - 이렇게 하면 부모 컴포넌트에서
      // 정의한 송금 완료 로직(잔액 업데이트 및 라우팅)이 실행됨
      onConfirm();

      // 비밀번호 모달 닫기
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[200] flex flex-col" onClick={onClose}>
      <div
        ref={modalRef}
        className="mt-auto bg-white rounded-t-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="p-6 bg-white">
          {/* 자물쇠 아이콘 */}
          <div className="flex justify-center mb-4">
            <LockClosedIcon className="w-8 h-8 text-teal-500" />
          </div>

          <h2 className="text-2xl font-bold flex justify-center mb-5">멍Pay 비밀번호</h2>

          {/* 비밀번호 입력 원형 UI */}
          <div className="flex justify-center space-x-4 my-3">
            {passwordCircles.map((_, index) => (
              <div
                key={index}
                className={`w-5 h-5 rounded-full border-1 border border-teal-500 ${
                  index < password.length ? "bg-teal-500" : "bg-white"
                }`}
              ></div>
            ))}
          </div>

          {/* 로딩 표시 */}
          {isLoading && (
            <div className="flex justify-center my-4">
              <svg className="animate-spin h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24">
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
            </div>
          )}
        </div>

        {/* 숫자 키패드 컴포넌트 */}
        <NumericKeypad
          onNumberPress={handleNumberPress}
          onBackspace={handleBackspace}
          onRearrange={handleRearrange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
