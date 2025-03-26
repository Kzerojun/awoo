"use client";

import { useEffect, useState } from "react";

interface SecurityKeypadProps {
  onInput: (digit: string) => void;
  onDelete: () => void;
  onConfirm: () => void;
}

export default function SecurityKeypad({ onInput, onDelete, onConfirm }: SecurityKeypadProps) {
  const [shuffled, setShuffled] = useState<string[]>([]);

  const shuffleDigits = () => {
    const base = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    for (let i = base.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    setShuffled(base);
  };

  useEffect(() => {
    shuffleDigits();
  }, []);

  return (
    <div className="fixed bottom-0 w-full bg-white px-4 pt-4 pb-14 z-50 shadow-[0_-1px_8px_rgba(0,0,0,0.05)]">
      {/* 숫자 키패드: 3줄로 자동 배치 (4열씩) */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        {shuffled.slice(0, 10).map((digit, index) => (
          <button
            key={index}
            onClick={() => onInput(digit)}
            className="text-xl font-semibold text-center py-3 rounded-md "
          >
            {digit}
          </button>
        ))}
        {/* 나머지 2칸은 빈 칸 */}
        <div></div>
        <div></div>
      </div>

      {/* 하단 기능 버튼들: 재배열 / 삭제 / 확인 */}
      <div className="grid grid-cols-3 gap-2">
        <button onClick={shuffleDigits} className="text-base font-bold py-3 rounded-md ">
          재배열
        </button>

        <button onClick={onDelete} className="text-2xl py-3 rounded-md">
          ←
        </button>

        <button onClick={onConfirm} className="text-aqua font-bold text-base text-center py-3">
          확인
        </button>
      </div>
    </div>
  );
}
