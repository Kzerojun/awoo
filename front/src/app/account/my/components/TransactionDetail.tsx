"use client";

import React from "react";
import { TransactionResponse } from "@/api/account/my/deposit";

interface TransactionDetailProps {
  transaction: TransactionResponse | null;
}

const TransactionDetail = ({ transaction }: TransactionDetailProps) => {
  const formattedDate = `${transaction?.transactionDate.slice(0, 4)}.${transaction?.transactionDate.slice(4, 6)}.${transaction?.transactionDate.slice(6, 8)}`;
  const formattedTime = `${transaction?.transactionTime.slice(0, 2)}:${transaction?.transactionTime.slice(2, 4)}:${transaction?.transactionTime.slice(4, 6)}`;
  const formattedTransacttionBalance = `${Number(transaction?.transactionBalance).toLocaleString("ko-KR")}`;
  const formattedTransacttionAfterBalance = `${Number(transaction?.transactionAfterBalance).toLocaleString("ko-KR")}`;
  const formattedTransactionAccountNo = `${transaction?.transactionAccountNo.replace(/(\d{4})(?=\d)/g, "$1-")}`;

  if (!transaction) {
    return null;
  }

  return (
    <div className="flex flex-col items-start justify-center py-3 w-full ">
      {/* 상단 */}
      {/* 거래 요약 */}
      <div className="w-full border-b-1 border-custom-gray py-1 text-2xl font-bold">
        {transaction.transactionSummary}
      </div>
      {/* 거래시간 & 거래구분 */}
      <div className="w-full py-5 border-b-1 border-custom-gray flex flex-col justify-center gap-y-3">
        {/* 거래시간 */}
        <div className=" flex items-center justify-between">
          <span>거래시간</span>
          <span>
            {formattedDate} {formattedTime}
          </span>
        </div>
        {/* 거래 구분 */}
        <div className=" flex items-center justify-between">
          <span>거래구분</span>
          <span>{transaction.transactionTypeName}</span>
        </div>
      </div>

      {/* 하단 */}

      <div className="w-full py-5 flex flex-col justify-center gap-y-5">
        {/* 거래금액 */}

        {transaction.transactionType === "1" ? (
          <div className="w-full flex justify-between items-center">
            <span>거래 금액</span>
            <span className="text-aqua font-bold">{formattedTransacttionBalance}원</span>
          </div>
        ) : (
          <div className="w-full flex justify-between items-center">
            <span>거래 금액</span>
            <span className="">- {formattedTransacttionBalance}원</span>
          </div>
        )}

        {/* 거래 후 잔액*/}
        <div className="w-full flex justify-between items-center">
          <span>거래 후 잔액</span>
          <span>{formattedTransacttionAfterBalance}원</span>
        </div>

        {/* 출금일 때 입금한 계좌번호 && 입금일 때 출금된 계좌번호*/}

        {transaction.transactionType === "2" ? (
          <div className="w-full flex items-center justify-between">
            <span>입금 계좌</span>
            <span>{formattedTransactionAccountNo}</span>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span>출금 계좌</span>
            <span>{formattedTransactionAccountNo}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetail;
