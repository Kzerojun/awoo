"use client";

import { useState } from "react";

interface NumberKeypadProps {
  onNumberPress: (num: number) => void;
  onBackspace: () => void;
  onClear?: () => void;
  disabled?: boolean;
}

export default function NumberKeypad({
  onNumberPress,
  onBackspace,
  onClear,
  disabled = false,
}: NumberKeypadProps) {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  // 숫자 버튼 클릭 처리
  const handleNumberPress = (num: number) => {
    if (disabled) return;

    // 버튼 활성화 효과
    setActiveButton(num);
    setTimeout(() => setActiveButton(null), 200);

    // 부모 컴포넌트에 이벤트 전달
    onNumberPress(num);
  };

  // 백스페이스 처리
  const handleBackspace = () => {
    if (disabled) return;

    // 버튼 활성화 효과
    setActiveButton(-1); // -1은 백스페이스를 의미
    setTimeout(() => setActiveButton(null), 200);

    // 부모 컴포넌트에 이벤트 전달
    onBackspace();
  };

  // 취소 버튼 처리
  const handleClear = () => {
    if (disabled) return;

    // 버튼 활성화 효과
    setActiveButton(-2); // -2는 취소를 의미
    setTimeout(() => setActiveButton(null), 200);

    // 부모 컴포넌트에 이벤트 전달 (옵션)
    if (onClear) {
      onClear();
    }
  };

  // 비활성화 스타일
  const getButtonStyle = (buttonValue: number) => {
    const isActive = activeButton === buttonValue;
    const baseStyle = isActive
      ? "bg-gray-300 transform scale-95"
      : buttonValue === -2
        ? "bg-gray-200 hover:bg-gray-300"
        : "bg-white hover:bg-gray-100";

    return `${baseStyle} ${
      disabled
        ? "opacity-50 cursor-not-allowed"
        : "transition-all duration-150 active:bg-gray-300 active:transform active:scale-95"
    }`;
  };

  return (
    <div className="bg-gray-100 py-6">
      <div className="grid grid-cols-3 gap-2 px-2">
        {/* 숫자 버튼 1-9 */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberPress(num)}
            disabled={disabled}
            className={`${getButtonStyle(num)} py-3 rounded-md text-xl font-medium`}
          >
            {num}
          </button>
        ))}

        {/* 하단 버튼들 */}
        <button
          onClick={handleClear}
          disabled={disabled}
          className={`${getButtonStyle(-2)} py-3 rounded-md text-sm font-medium`}
        >
          취소
        </button>
        <button
          onClick={() => handleNumberPress(0)}
          disabled={disabled}
          className={`${getButtonStyle(0)} py-3 rounded-md text-xl font-medium`}
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          disabled={disabled}
          className={`${getButtonStyle(-1)} py-3 rounded-md flex items-center justify-center`}
        >
          <svg
            className="w-6 h-6 text-gray-600"
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
    </div>
  );
}
