"use client";
import { DepositDetail, DepositContent } from "./MockDeposit";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransactionDetail from "./TransactionDetail";

import Button from "@/common/ui/Button";

interface TransactionObject {
  transactionUniqueNo: string;
  transactionDate: string;
  transactionTime: string;
  transactionType: string;
  transactionTypeName: string;
  transactionAccountNo: string;
  transactionBalance: string;
  transactionAfterBalance: string;
  transactionSummary: string;
  transactionMemo: string;
}

const TransactionList = () => {
  // 오늘 날짜 포매팅
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 1월이 0이므로 +1
  const date = String(today.getDate()).padStart(2, "0");
  const todayStr = `${year}${month}${date}`; // 20250327

  // 계좌 개설일
  const createDate = DepositContent[0].accountCreatedDate;
  const formattedStartDate = `${createDate.slice(0, 4)}-${createDate.slice(4, 6)}-${createDate.slice(6, 8)}`;
  const formattedTodayStr = today.toISOString().slice(0, 10); // 2025-03-27
  const transactionHistory = DepositDetail;

  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const [showTransactionObject, setShowTransactionObject] = useState<TransactionObject | null>(
    null
  );

  const showDetail = (transaction: TransactionObject) => {
    setShowTransactionObject(transaction);
    setIsShowDetail(true);
  };

  return (
    <div className="w-full h-full">
      <div className="h-[8%] w-ful flex items-center justify-end border-b-1 border-custom-gray text-sm">
        조회일 : {formattedStartDate} ~ {formattedTodayStr}
      </div>
      <div className=" w-full h-[92%] overflow-y-auto">
        {transactionHistory.map((transaction) => (
          <div
            key={transaction.transactionUniqueNo}
            className="w-full p-3 flex items-start justify-between border-b-1 border-custom-gray"
            onClick={() => showDetail(transaction)}
          >
            {/* 거래 날짜와 요약 */}
            <div className="flex items-center justify-between gap-x-5">
              <div className="text-custom-gray text-sm">{`${transaction.transactionDate.slice(4, 6)}.${transaction.transactionDate.slice(6, 8)}`}</div>
              <div>{transaction.transactionSummary}</div>
            </div>
            {/* 액수 */}
            <div className="flex flex-col items-end justify-center text-lg">
              {transaction.transactionType === "1" && (
                <span className="text-aqua font-bold">
                  {Number(transaction.transactionBalance).toLocaleString("ko-KR")}원
                </span>
              )}
              {transaction.transactionType === "2" && (
                <span>-{Number(transaction.transactionBalance).toLocaleString("ko-KR")}원</span>
              )}
              <span className="text-custom-gray text-sm">
                {Number(transaction.transactionAfterBalance).toLocaleString("ko-KR")}원
              </span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isShowDetail && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsShowDetail(false)}
          >
            <motion.div
              className="w-full flex flex-col items-center justify-center gap-y bg-custom-white rounded-t-2xl p-6 pb-8 mb-13.5"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TransactionDetail transaction={showTransactionObject} />
              <Button text="확인" onClick={() => setIsShowDetail(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionList;
