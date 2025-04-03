"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Button from "@/common/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  isPayCheck: boolean;
  isSavingCheck: boolean;
}

const ImpossibleDeleteDepositModal = ({
  isOpen,
  onClose,
  className,
  isPayCheck,
  isSavingCheck,
}: Props) => {
  const router = useRouter();
  const goToQuestion = () => {
    router.replace("/my/question/questioning");
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-200 bg-black/30 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`w-full bg-white rounded-t-2xl flex flex-col justify-center items-center ${className}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex flex-col justify-center rounded-t-2xl gap-y-1">
              <div onClick={onClose} className="flex justify-start items-center">
                <XMarkIcon className="w-5 h-5 text-gray-600 m-3" />
              </div>

              <div className="w-full flex flex-col justify-center items-center">
                <div className="text-center flex flex-col items-center justify-center font-bold">
                  <span className="flex flex-col items-center justify-center gap-y-2">
                    <span className="text-red-500 text-lg">해지 실패 사유</span>

                    {!isPayCheck && !isSavingCheck && (
                      <span>멍페이 출금 계좌 및 적금의 근거 계좌</span>
                    )}
                    {!isPayCheck && isSavingCheck && <span>멍페이 출금 계좌 등록</span>}
                    {isPayCheck && !isSavingCheck && <span>적금의 근거 계좌</span>}
                  </span>
                  <br />
                  <span className="mt-1">
                    출금 계좌 등록 해지 후 <br />
                    다시 시도해주세요.
                  </span>
                </div>
              </div>

              <div className="w-full my-5 flex flex-col justify-center items-center gap-y-3">
                <Button
                  text="1:1 문의하기"
                  backgroundColor="white"
                  border="aqua"
                  fontColor="aqua"
                  onClick={goToQuestion}
                />
                <Button text="확인" onClick={onClose} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImpossibleDeleteDepositModal;
