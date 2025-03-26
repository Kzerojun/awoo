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

  // 컴포넌트 마운트 시 항상 패스워드 초기화
  useEffect(() => {
    setPassword("");
    setError("");
  }, [isConfirm]); // isConfirm이 변경될 때마다 초기화

  // 키보드 이벤트 핸들러 (숫자 키 입력 감지)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 숫자 키 감지 (0-9)
      if (e.key >= "0" && e.key <= "9" && password.length < length) {
        setPassword((prev) => {
          const newPassword = prev + e.key;

          // 비밀번호가 모두 입력되었을 때
          if (newPassword.length === length && onComplete) {
            setTimeout(() => {
              onComplete(newPassword);
            }, 300); // 애니메이션 효과를 위한 지연
          }

          return newPassword;
        });
      }
      // 백스페이스 키 감지
      else if (e.key === "Backspace" && password.length > 0) {
        setPassword((prev) => prev.slice(0, -1));
        setError("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [password, length, onComplete]);

  return (
    <div className="flex flex-col min-h-[calc(70vh-56px)] bg-white">
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
    </div>
  );
}
