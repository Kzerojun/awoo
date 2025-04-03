"use client";

import React, { useState, ChangeEvent } from "react";
import { TransactionResponse } from "@/api/account/my/deposit";
import { usePostTransactionMemo } from "@/hooks/account/deposit/usePostTransactionMemo";
import Button from "@/common/ui/Button";
import { useAppSelector } from "@/lib/store";

interface TransactionDetailProps {
  transaction: TransactionResponse | null;
  onClose: () => void;
  onUpdate: () => void;
}

const TransactionDetail = ({ transaction, onClose, onUpdate }: TransactionDetailProps) => {
  const { mutate: memoMutation, isPending: memoPending } = usePostTransactionMemo();
  // 계좌번호
  const accountNo = useAppSelector((state) => state.myDepositSaving.deposit?.accountNo);
  // 거래 고유 번호
  const transactionUniqueNo = transaction?.transactionUniqueNo;

  const formattedDate = `${transaction?.transactionDate.slice(0, 4)}.${transaction?.transactionDate.slice(4, 6)}.${transaction?.transactionDate.slice(6, 8)}`;
  const formattedTime = `${transaction?.transactionTime.slice(0, 2)}:${transaction?.transactionTime.slice(2, 4)}:${transaction?.transactionTime.slice(4, 6)}`;
  const formattedTransacttionBalance = `${Number(transaction?.transactionBalance).toLocaleString("ko-KR")}`;
  const formattedTransacttionAfterBalance = `${Number(transaction?.transactionAfterBalance).toLocaleString("ko-KR")}`;
  const formattedTransactionAccountNo = `${transaction?.transactionAccountNo.replace(/(\d{4})(?=\d)/g, "$1-")}`;
  const transactionMemo = transaction?.transactionMemo;

  // 메모 내용
  const [postTransactionMemo, setPostTransactionMemo] = useState<string>("");

  const handleMemo = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPostTransactionMemo(value);
  };

  const handlePostMemo = () => {
    if (transaction && postTransactionMemo && accountNo && transactionUniqueNo) {
      memoMutation(
        { accountNo, transactionMemo: postTransactionMemo, transactionUniqueNo },
        {
          onSuccess: (data) => {
            console.log("거래 내역 메모 성공");
            onUpdate();
            onClose();
          },
          onError: (err) => {
            console.error("거래 내역 메모 실패:", err);
            alert("다시 시도하세요.");
            onClose();
          },
        }
      );
    } else {
      alert("다시 시도하세요.");
      onClose();
      return;
    }
  };

  if (!transaction) {
    return null;
  }

  return (
    <div className="flex flex-col items-start justify-center py-3 w-full ">
      {/* 상단 */}
      {/* 거래 요약 */}
      <div className="w-full border-b-1 border-gray-300 py-1 flex flex-col justify-center gap-y-3">
        <div className="w-full text-2xl font-bold">{transaction.transactionSummary}</div>
        {transactionMemo ? (
          <div className="text-gray-500">{transaction.transactionMemo}</div>
        ) : (
          <div className="w-full">
            <input
              type="text"
              placeholder="메모를 입력하세요... (최대 20자)"
              className="w-full text-gray-400 text-sm focus:outline-none"
              onChange={handleMemo}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // 폼 제출 방지
                  handlePostMemo();
                }
              }}
              maxLength={20}
            />
          </div>
        )}
      </div>
      {/* 거래시간 & 거래구분 */}
      <div className="w-full py-5 border-b-1 border-gray-300 flex flex-col justify-center gap-y-3">
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
      <div className="mx-auto">
        <Button text="확인" onClick={onClose} className="w-80" />
      </div>
    </div>
  );
};

export default TransactionDetail;
