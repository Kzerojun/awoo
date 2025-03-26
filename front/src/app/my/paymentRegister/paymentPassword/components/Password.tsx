"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PasswordProps {
  title?: string;
  subtitle?: string;
  length?: number;
  isConfirm?: boolean;
  onComplete?: (password: string) => void;
  key?: string; // key prop 추가 - 컴포넌트 리마운트를 위해
}

export default function Password({
  title = "멍Pay에서 쓸",
  subtitle = "비밀번호를 등록해 주세요",
  length = 6,
  isConfirm = false,
  onComplete,
}: PasswordProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeButton, setActiveButton] = useState<number | null>(null);

  // 컴포넌트 마운트 시 항상 패스워드 초기화
  useEffect(() => {
    setPassword("");
    setError("");
  }, [isConfirm]); // isConfirm이 변경될 때마다 초기화

  // 숫자 입력 처리
  const handleNumberInput = (num: number) => {
    // 버튼 활성화 효과
    setActiveButton(num);
    setTimeout(() => setActiveButton(null), 200);

    if (password.length < length) {
      const newPassword = password + num;
      setPassword(newPassword);

      // 비밀번호가 모두 입력되었을 때
      if (newPassword.length === length && onComplete) {
        setTimeout(() => {
          onComplete(newPassword);
        }, 300); // 애니메이션 효과를 위한 지연
      }
    }
  };

  // 백스페이스 처리
  const handleBackspace = () => {
    // 버튼 활성화 효과
    setActiveButton(-1); // -1은 백스페이스를 의미
    setTimeout(() => setActiveButton(null), 200);

    if (password.length > 0) {
      setPassword(password.slice(0, -1));
      setError("");
    }
  };

  // 취소 버튼 처리
  const handleCancel = () => {
    // 버튼 활성화 효과
    setActiveButton(-2); // -2는 취소를 의미
    setTimeout(() => setActiveButton(null), 200);

    setPassword("");
    setError("");
  };

  // 키보드 이벤트 핸들러 (숫자 키 입력 감지)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 숫자 키 감지 (0-9)
      if (e.key >= "0" && e.key <= "9") {
        handleNumberInput(parseInt(e.key));
      }
      // 백스페이스 키 감지
      else if (e.key === "Backspace") {
        handleBackspace();
      }
      // ESC 키는 취소로 처리
      else if (e.key === "Escape") {
        handleCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [password, length, onComplete]);

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-white">
      {/* 제목 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
        <p className="text-xl font-bold text-center mb-8">{subtitle}</p>

        {/* 비밀번호 표시 영역 */}
        <div className="flex justify-center space-x-4 mb-5 w-full">
          {Array.from({ length }).map((_, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full ${
                password.length > index ? "bg-teal-500" : "bg-white border border-teal-500"
              }`}
            />
          ))}
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* 안내 메시지 */}
        <p className="text-gray-500 text-sm mt-2">
          {isConfirm ? "처음 입력한 비밀번호와 동일하게 입력해주세요" : "숫자 6자리를 입력해주세요"}
        </p>
      </div>

      {/* 숫자 키패드 */}
      <div className="bg-gray-100 py-4">
        <div className="grid grid-cols-3 gap-2 px-2">
          {/* 숫자 버튼 1-9 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberInput(num)}
              className={`${
                activeButton === num
                  ? "bg-gray-300 transform scale-95"
                  : "bg-white hover:bg-gray-100"
              } py-3 rounded-md text-xl font-medium transition-all duration-150 active:bg-gray-300 active:transform active:scale-95`}
            >
              {num}
            </button>
          ))}

          {/* 하단 버튼들 */}
          <button
            onClick={handleCancel}
            className={`${
              activeButton === -2
                ? "bg-gray-300 transform scale-95"
                : "bg-gray-200 hover:bg-gray-300"
            } py-3 rounded-md text-sm font-medium transition-all duration-150 active:bg-gray-300 active:transform active:scale-95`}
          >
            취소
          </button>
          <button
            onClick={() => handleNumberInput(0)}
            className={`${
              activeButton === 0 ? "bg-gray-300 transform scale-95" : "bg-white hover:bg-gray-100"
            } py-3 rounded-md text-xl font-medium transition-all duration-150 active:bg-gray-300 active:transform active:scale-95`}
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className={`${
              activeButton === -1 ? "bg-gray-300 transform scale-95" : "bg-white hover:bg-gray-100"
            } py-3 rounded-md flex items-center justify-center transition-all duration-150 active:bg-gray-300 active:transform active:scale-95`}
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
    </div>
  );
}
