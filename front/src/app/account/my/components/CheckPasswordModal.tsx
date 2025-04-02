"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useCheckPassword } from "@/hooks/account/deposit/useCheckPassword";
import { checkPasswordConfirm } from "@/lib/slices/userActionSlice";
import { useRouter } from "next/navigation";
import NumericKeypad from "@/app/my/paymentSend/components/NumericKeypad";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  isOpen: boolean;
  onConfirm: (password: string) => void;
  onClose: () => void;
}
const CheckPasswordModal = ({ isOpen, onConfirm, onClose }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accountNo = useAppSelector((state) => state.transfer.withdrawalAccountNo);
  const { mutate: checkPasswordMutate } = useCheckPassword();
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  // 비밀번호 원 표시를 위한 배열
  const passwordCircles = Array(4).fill(null);

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
              onClose();
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
    setErrorCount((prev) => prev + 1);
    setPassword("");
    dispatch(checkPasswordConfirm(false));

    // 오류 메시지 표시
    alert("비밀번호가 일치하지 않습니다.");

    // 3회 이상 실패하면 모달 닫기
    if (errorCount >= 2) {
      // 현재 카운트 + 1로 판단하므로 2를 기준으로 함

      const lockUntil = Date.now() + 10 * 60 * 1000; // 현재 시간 + 10분
      localStorage.setItem("accountPasswordLockUntil", lockUntil.toString());

      alert("비밀번호 입력 횟수를 초과했습니다.");
      setTimeout(() => {
        setPassword("");
        setIsLoading(false);
        setErrorCount(0);
        router.replace("/home");
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full bg-white rounded-t-2xl flex flex-col justify-center"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-green w-full rounded-t-2xl">
              <div onClick={onClose}>
                <XMarkIcon className="w-7 h-7 text-gray-600 m-3" />
              </div>
              <div className="flex justify-center my-6">
                <LockClosedIcon className="w-8 h-8 text-teal-500" />
              </div>
              <h2 className="text-xl font-bold flex justify-center">계좌 비밀번호</h2>

              <div className="flex justify-center space-x-4 my-10">
                {passwordCircles.map((_, index) => (
                  <div
                    key={index}
                    className={`w-5 h-5 rounded-full border-1 border-teal-500 ${
                      index < password.length ? "bg-teal-500" : "bg-white"
                    }`}
                  ></div>
                ))}
              </div>

              {errorCount > 0 && (
                <p className="text-center text-red-500 text-sm py-3">
                  비밀번호 불일치 ({errorCount}/3)
                </p>
              )}
            </div>

            {/* 하단 키패드 영역 */}
            <div className="w-full">
              <NumericKeypad
                onNumberPress={handleNumberPress}
                onBackspace={handleBackspace}
                onRearrange={handleRearrange}
                isLoading={isLoading}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckPasswordModal;
