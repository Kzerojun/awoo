"use client";

import { BackspaceIcon } from "@heroicons/react/24/outline";

interface ChargeNumericKeypadProps {
  onNumberPress: (num: number) => void;
  onBackspace: () => void;
  onClose: () => void;
  disabled?: boolean;
}

export default function ChargeNumericKeypad({
  onNumberPress,
  onBackspace,
  onClose,
  disabled = false,
}: ChargeNumericKeypadProps) {
  // 빠른 충전 금액 옵션
  const quickChargeOptions = [
    { label: "+십만원", value: 100000 },
    { label: "+오만원", value: 50000 },
    { label: "+만원", value: 10000 },
  ];

  return (
    <div className="w-full rounded-t-2xl">
      {/* 빠른 충전 옵션 */}
      <div className="grid grid-cols-3 gap-px bg-[#F5F5F5] rounded-t-2xl overflow-hidden">
        {quickChargeOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => onNumberPress(option.value)}
            disabled={disabled}
            className="py-3 bg-[#F5F5F5] hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* 키패드 */}
      <div className="grid grid-cols-3 gap-px bg-gray-100">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => onNumberPress(num)}
            disabled={disabled}
            className="py-4 bg-white hover:bg-gray-50 active:bg-gray-100 text-2xl font-medium disabled:opacity-50"
          >
            {num}
          </button>
        ))}
        <button
          className="py-4 bg-white hover:bg-gray-50 active:bg-gray-100 text-lg text-gray-600 disabled:opacity-50"
          onClick={onClose}
          disabled={disabled}
        >
          닫기
        </button>
        <button
          onClick={() => onNumberPress(0)}
          disabled={disabled}
          className="py-4 bg-white hover:bg-gray-50 active:bg-gray-100 text-2xl font-medium disabled:opacity-50"
        >
          0
        </button>
        <button
          onClick={onBackspace}
          disabled={disabled}
          className="py-4 bg-white hover:bg-gray-50 active:bg-gray-100 flex justify-center items-center disabled:opacity-50"
        >
          <BackspaceIcon className="w-9 h-8 text-gray-500" />
        </button>
      </div>
      <div className="border-t border-gray-100 py-4"></div>
    </div>
  );
}
