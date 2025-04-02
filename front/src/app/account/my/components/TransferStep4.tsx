"use client";

import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Image from "next/image";
import TransferCheck from "../../../../../public/icons/transfer/TransferCheckmark.svg";
import messageIcon from "../../../../../public/icons/transfer/messageIcon.svg";
import Button from "@/common/ui/Button";
import { useRouter } from "next/navigation";
import { usePostTransactionMemo } from "@/hooks/account/deposit/usePostTransactionMemo";
import { clearTransferData } from "@/lib/slices/transferSlice";

const TransferStep4 = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: postTransactionMutation, isPending: postMemoPending } = usePostTransactionMemo();
  // 수취인 정보
  const withdrawalTransactionSummary = useAppSelector(
    (state) => state.transfer.withdrawalTransactionSummary
  );
  // 거래 내역
  const transactionBalance = useAppSelector((state) => state.transfer.transactionBalance);
  // 내 계좌번호
  const accountNo = useAppSelector((state) => state.transfer.withdrawalAccountNo);
  // 거래 고유 번호 (출금)
  const transactionUniqueNo = useAppSelector(
    (state) => state.transfer.transferResponse[0].transactionUniqueNo
  );

  const formatAmount = (amount?: number): string => {
    if (!amount) return "";
    return Number(amount).toLocaleString("ko-KR");
  };
  const [transactionMemo, setTransactionMemo] = useState<string>("");

  const handleMemo = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTransactionMemo(value);
  };

  const handleSubmitMemo = () => {
    if (!transactionMemo) {
      router.replace("/home");
      dispatch(clearTransferData());
    }
    if (transactionMemo && (!accountNo || !transactionUniqueNo)) {
      alert("나중에 다시 시도해주세요.");
      router.replace("/home");
      dispatch(clearTransferData());
      return;
    }
    postTransactionMutation(
      {
        accountNo: accountNo,
        transactionUniqueNo: transactionUniqueNo,
        transactionMemo: transactionMemo,
      },
      {
        onSuccess: (data) => {
          console.log("거래 내역 메모 성공:", data);
          router.replace("/home");
          dispatch(clearTransferData());
        },
        onError: (err) => {
          console.error("거래 내역 메모 실패:", err);
          alert("나중에 다시 시도해주세요.");
          router.replace("/home");
          dispatch(clearTransferData());
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-15">
      <Image src={TransferCheck} alt="체크" width={100} height={100} />
      <div className="text-center text-xl">
        <span className="font-bold">{withdrawalTransactionSummary}</span>님에게 <br />
        <span className="font-bold text-aqua">{formatAmount(transactionBalance)}원</span>을 보냈어요
      </div>

      <div className="flex justify-center items-center p-3 bg-gray-200 rounded-2xl h-8 gap-x-2">
        <label htmlFor="messageIcon">
          {/* <Image src={messageIcon} alt="메시지 아이콘" width={20} height={20} /> */}
          💬
        </label>
        <input
          type="text"
          placeholder="메모입력..."
          className="w-30 text-center focus:outline-none"
          onChange={handleMemo}
          maxLength={20}
        />
      </div>
      <div className="mt-10">
        <Button
          text={`${postMemoPending ? "확인 중.." : "확인"}`}
          width="medium"
          onClick={handleSubmitMemo}
        />
      </div>
    </div>
  );
};

export default TransferStep4;
