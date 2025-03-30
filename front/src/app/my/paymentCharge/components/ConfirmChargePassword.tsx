"use client";

import { useState, useRef, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import NumericKeypad from "../../paymentSend/components/NumericKeypad";
import { verifyPaymentPassword } from "@/api/payment/payment";
import { toast } from "react-toastify";

interface ConfirmChargePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: string;
}

export default function ConfirmChargePassword({
  isOpen,
  onClose,
  onConfirm,
  amount,
}: ConfirmChargePasswordProps) {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorCount, setErrorCount] = useState<number>(0);
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
    if (password.length < 6 && !isLoading) {
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
    if (password.length > 0 && !isLoading) {
      setPassword((prev) => prev.slice(0, -1));
    }
  };

  // 키패드 재배열 처리 - NumericKeypad 내부에서 처리하므로 빈 함수로 유지
  const handleRearrange = () => {
    // 이 함수는 NumericKeypad 내부에서 처리
  };

  // 확인 버튼 처리
  const handleConfirm = async (pwd: string) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // API 호출로 비밀번호 검증
      const isPasswordValid = await verifyPaymentPassword({ password: pwd });

      if (isPasswordValid) {
        // 비밀번호 검증 성공
        console.log("비밀번호 검증 성공");

        // 부모 컴포넌트에서 정의한 충전 완료 로직 실행
        onConfirm();

        // 비밀번호 모달 닫기
        onClose();
      } else {
        // 비밀번호 검증 실패
        handleVerificationFailure();
      }
    } catch (error) {
      console.error("비밀번호 검증 중 오류 발생:", error);
      handleVerificationFailure();
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 검증 실패 처리
  const handleVerificationFailure = () => {
    setErrorCount((prev) => prev + 1);
    setPassword("");

    // 오류 메시지 표시
    toast.error("비밀번호가 일치하지 않습니다.");

    // 3회 이상 실패하면 모달 닫기
    if (errorCount >= 2) {
      // 현재 카운트 + 1로 판단하므로 2를 기준으로 함
      toast.error("비밀번호 입력 횟수를 초과했습니다.");
      setTimeout(() => {
        onClose();
      }, 1500);
    }
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

          <h2 className="text-2xl font-bold flex justify-center mb-3">멍Pay 비밀번호</h2>

          {/* 금액 표시 */}
          {amount && (
            <p className="text-center text-gray-500 mb-3">
              {parseInt(amount).toLocaleString()}원을 충전합니다
            </p>
          )}

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

          {/* 오류 표시 */}
          {errorCount > 0 && (
            <p className="text-center text-red-500 text-sm mt-2">
              비밀번호 불일치 ({errorCount}/3)
            </p>
          )}

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
