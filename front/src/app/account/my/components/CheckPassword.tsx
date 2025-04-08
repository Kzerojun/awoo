"use client";

import React, { useState, useRef, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import NumericKeypad from "@/app/my/paymentSend/components/NumericKeypad";
import { verifyPaymentPassword } from "@/api/payment/payment";
import { useCheckPassword } from "@/hooks/account/deposit/useCheckPassword";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { checkPasswordConfirm } from "@/lib/slices/userActionSlice";

interface ConfirmPasswordProps {
  onConfirm: (password: string) => void;
  accountNo: string;
}

const CheckPassword = ({ onConfirm, accountNo }: ConfirmPasswordProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: checkPasswordMutate } = useCheckPassword();
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  const passwordStatus = useAppSelector((state) => state.userAction.checkPassword);

  // 비밀번호 원 표시를 위한 배열
  const passwordCircles = Array(4).fill(null);

  useEffect(() => {
    const lockUntil = localStorage.getItem("accountPasswordLockUntil");
    if (lockUntil && Date.now() < Number(lockUntil)) {
      dispatch(checkPasswordConfirm(false));
    } else {
      dispatch(checkPasswordConfirm(true));
      localStorage.removeItem("accountPasswordLockUntil"); // 만료되었으면 초기화
    }
    console.log(accountNo);
  }, []);

  // 숫자 입력 처리
  const handleNumberPress = (num: number) => {
    if (password.length < 4 && !isLoading) {
      const newPassword = password + num;
      setPassword(newPassword);

      // 4자리 다 입력하면 자동으로 확인 처리
      if (newPassword.length === 4) {
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
      checkPasswordMutate(
        { password: pwd, accountNo: accountNo },
        {
          onSuccess: (data) => {
            if (data.success === true) {
              onConfirm(pwd);
              setPassword("");
              setIsLoading(false);
              setErrorCount(0);
              localStorage.removeItem("accountPasswordLockUntil");
              dispatch(checkPasswordConfirm(true));
            } else {
              alert("비밀번호를 다시 입력하세요.");
              handleVerificationFailure();
            }
          },
          onError: () => {
            alert("비밀번호를 다시 입력하세요.");
            handleVerificationFailure();
          },
        }
      );
    } catch (error) {
      console.error("비밀번호 검증 중 오류 발생:", error);
      handleVerificationFailure();
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 검증 실패 처리
  const handleVerificationFailure = () => {
    const nextCount = errorCount + 1;
    setErrorCount(nextCount);

    setPassword("");

    // 3회 이상 실패하면 모달 닫기
    if (nextCount >= 3) {
      const lockUntil = Date.now() + 10 * 60 * 1000; // 현재 시간 + 10분
      localStorage.setItem("accountPasswordLockUntil", lockUntil.toString());

      alert("비밀번호 입력 횟수를 초과했습니다.");
      setTimeout(() => {
        dispatch(checkPasswordConfirm(false));
        setPassword("");
        setIsLoading(false);
        setErrorCount(0);
        router.replace("/home");
      }, 1500);
    }
  };

  return (
    <div className="mt-20 bg-white rounded-t-3xl overflow-hidden">
      {/* 헤더 */}
      <div className="p-6 bg-white">
        {/* 자물쇠 아이콘 */}
        <div className="flex justify-center mb-4">
          <LockClosedIcon className="w-8 h-8 text-teal-500" />
        </div>

        <h2 className="text-2xl font-bold flex justify-center mb-5">계좌 비밀번호</h2>

        {/* 비밀번호 입력 원형 UI */}
        <div className="flex justify-center space-x-4 my-20">
          {passwordCircles.map((_, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full border-1 border-teal-500 ${
                index < password.length ? "bg-teal-500" : "bg-white"
              }`}
            ></div>
          ))}
        </div>

        {/* 오류 표시 */}
        {errorCount > 0 && (
          <p className="text-center text-red-500 text-sm mt-2">비밀번호 불일치 ({errorCount}/3)</p>
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
      {errorCount === 3 ? (
        <div className="text-center text-red-500 p-4">
          비밀번호 입력이 잠시 차단되었습니다.
          <br />
          10분 후 다시 시도해주세요.
        </div>
      ) : (
        <div className="bottom-0 fixed left-0 right-0">
          <NumericKeypad
            onNumberPress={handleNumberPress}
            onBackspace={handleBackspace}
            onRearrange={handleRearrange}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default CheckPassword;
