"use client";

import { useState, useEffect } from "react";

interface NumericKeypadProps {
  onNumberPress: (num: number) => void;
  onBackspace: () => void;
  onRearrange: () => void;
  isLoading: boolean;
}

export default function NumericKeypad({
  onNumberPress,
  onBackspace,
  onRearrange,
  isLoading,
}: NumericKeypadProps) {
  const [keypadNumbers, setKeypadNumbers] = useState<number[]>([]);

  // 키패드 번호 무작위 배치 함수
  const shuffleKeypad = () => {
    // 1부터 9까지의 숫자 배열 생성
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Fisher-Yates 알고리즘으로 숫자 배열 섞기
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    setKeypadNumbers(numbers);
  };

  // 컴포넌트 마운트 시 초기 배치
  useEffect(() => {
    shuffleKeypad();
  }, []);

  // 재배열 버튼 클릭 처리
  const handleRearrange = () => {
    shuffleKeypad();
    onRearrange();
  };

  return (
    <div className="border-t border-gray-200">
      {/* 1-9 숫자 키패드 그리드 (섞인 배열 사용) */}
      <div className="grid grid-cols-3">
        {keypadNumbers.slice(0, 3).map((num) => (
          <button
            key={num}
            onClick={() => onNumberPress(num)}
            disabled={isLoading}
            className="py-5 border-r border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-2xl font-medium disabled:opacity-50"
          >
            {num}
          </button>
        ))}
        {keypadNumbers.slice(3, 6).map((num) => (
          <button
            key={num}
            onClick={() => onNumberPress(num)}
            disabled={isLoading}
            className="py-5 border-r border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-2xl font-medium disabled:opacity-50"
          >
            {num}
          </button>
        ))}
        {keypadNumbers.slice(6, 9).map((num) => (
          <button
            key={num}
            onClick={() => onNumberPress(num)}
            disabled={isLoading}
            className="py-5 border-r border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-2xl font-medium disabled:opacity-50"
          >
            {num}
          </button>
        ))}
      </div>

      {/* 하단 버튼 영역 */}
      <div className="grid grid-cols-3">
        <button
          className="py-5 border-r border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50"
          onClick={handleRearrange}
          disabled={isLoading}
        >
          재배열
        </button>
        <button
          onClick={() => onNumberPress(0)}
          disabled={isLoading}
          className="py-5 border-r border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-2xl font-medium disabled:opacity-50"
        >
          0
        </button>
        <button
          onClick={onBackspace}
          disabled={isLoading}
          className="py-5 hover:bg-gray-50 active:bg-gray-100 flex justify-center items-center disabled:opacity-50"
        >
          <svg
            className="h-8 w-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
  );
}
