"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/lib/store";
import Image from "next/image";
import awooLogo from "../../../../../public/logos/transfer_awoo.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  goToCheckPassword: () => void;
  transferName: string;
  transferBalance: string;
}

const TransferModal = ({
  isOpen,
  onClose,
  goToCheckPassword,
  transferName,
  transferBalance,
}: Props) => {
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
            className="w-full bg-white rounded-t-2xl p-4 pb-8 "
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center justify-center gap-y-3">
              <Image
                src={awooLogo}
                alt="awoo 원형 로고"
                width={60}
                height={60}
                className="mt-10 rounded-full"
              />
              {/* 이체 안내 멘트 */}
              <div className="text-center text-lg mt-5">
                <span className="font-bold">{transferName}</span>님에게{" "}
                <span className="font-bold">{transferBalance}원</span> <br />
                이체하시겠습니까?
              </div>

              {/* 취소 버튼과 이체하기 버튼 */}
              <div className="w-full flex justify-center items-center gap-x-3 mt-5">
                <button className="w-1/3 h-12 rounded-lg bg-gray-300" onClick={onClose}>
                  취소
                </button>
                <button className="w-2/3 h-12 rounded-lg bg-green" onClick={goToCheckPassword}>
                  이체하기
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransferModal;
