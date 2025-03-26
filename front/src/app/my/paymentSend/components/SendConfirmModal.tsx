"use client";

import { useState, useRef } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";

interface SendConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onEdit: () => void;
  amount: number;
  bankInfo: {
    bank: string;
    accountNumber: string;
  };
}

export default function SendConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  onEdit,
  amount,
  bankInfo,
}: SendConfirmModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 송금 실행 처리
  const handleSendMoney = () => {
    setIsLoading(true);

    // 실제로는 API 호출을 여기서 할 것임
    setTimeout(() => {
      setIsLoading(false);
      onConfirm();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex flex-col" onClick={onClose}>
      <div
        ref={modalRef}
        className="mt-auto bg-white rounded-t-3xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">송금 확인</h2>
          <button onClick={onClose} className="p-1 rounded-full">
            <svg
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 은행 정보 */}
        <div className="mb-6">
          <p className="text-gray-600 mb-1 text-sm">받는 계좌</p>
          <p className="text-lg font-medium">
            {bankInfo.bank} {bankInfo.accountNumber}
          </p>
        </div>

        {/* 송금 금액 */}
        <div className="mb-5 flex items-center ">
          <div>
            <p className="text-gray-600 mb-1 text-sm">송금 금액</p>
            <p className="text-3xl font-bold">{amount.toLocaleString()} 원</p>
          </div>
          <button onClick={onEdit} className="p-2 rounded-full hover:bg-gray-100 mt-6 ml-1">
            <PencilIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* 수수료 정보 */}
        <div className="border-t border-dashed border-gray-300"></div>
        <div className="pt-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-500 text-sm">수수료</p>
            <p className="text-gray-800">무료</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">보내는 분</p>
            <p className="text-lg">김홍범</p>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSendMoney}
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-teal-500 text-white text-lg font-medium flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
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
                송금 처리 중...
              </>
            ) : (
              "보내기"
            )}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full py-3 rounded-2xl border border-gray-300 text-gray-600 text-lg font-medium mb-4"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
