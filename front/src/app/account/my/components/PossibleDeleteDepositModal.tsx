"use client";

import React, { useState, ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Button from "@/common/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  setRefundAccountNo: (value: string) => void;
  setShowCheckPasswordModal: (value: boolean) => void;
}

const PossibleDeleteDepositModal = ({
  isOpen,
  onClose,
  className,
  setRefundAccountNo,
  setShowCheckPasswordModal,
}: Props) => {
  const [showInputRefundAccount, setShowInputRefundAccount] = useState<boolean>(false);
  const [inputRefund, setInputRefund] = useState<string>("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    setInputRefund(value);
  };

  const checkRefund = () => {
    setShowInputRefundAccount(false);
    setRefundAccountNo(inputRefund);
    setShowCheckPasswordModal(true);
    onClose();
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
            className={`w-full bg-white rounded-t-2xl flex flex-col justify-center ${className}`}
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
                {!showInputRefundAccount ? (
                  <div className="flex flex-col items-center justify-center gap-y-2 mb-10">
                    <div className="text-lg">해지 가능</div>
                    <div className="mb-5">정말로 해지하시겠습니까?</div>
                    <Button text="확인" onClick={() => setShowInputRefundAccount(true)} />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-y-5">
                    <div>잔액을 반환받을 계좌 번호를 입력해주세요.</div>
                    <div className="w-full h-10 rounded-xl border border-gray-300 flex justify-center items-center">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="계좌 번호"
                        className="w-full px-2 focus:outline-none"
                        value={inputRefund}
                        onChange={handleChangeInput}
                        maxLength={20}
                      />
                    </div>
                    <div className="w-full my-5 flex flex-col justify-center items-center gap-y-3">
                      <Button
                        text="해지하기"
                        fontColor="aqua"
                        border="aqua"
                        backgroundColor="white"
                        onClick={checkRefund}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PossibleDeleteDepositModal;
