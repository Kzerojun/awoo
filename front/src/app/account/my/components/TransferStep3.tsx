"use client";

import React, { useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Button from "@/common/ui/Button";
import { changeTransferData, clearTransferData } from "@/lib/slices/transferSlice";
import TransferModal from "./TransferModal";
import CheckPasswordModal from "./CheckPasswordModal";
import { useAccountTransfer } from "@/hooks/account/deposit/useAccountTransfer";

const TransferStep3 = () => {
  const dispatch = useAppDispatch();
  const { mutate: transferMutation, isPending: transferPending } = useAccountTransfer();

  const depositAccountNo = useAppSelector((state) => state.transfer.depositAccountNo);
  const withdrawalTransactionSummary = useAppSelector(
    (state) => state.transfer.withdrawalTransactionSummary
  );
  //   거래 금액
  const transactionBalance = useAppSelector((state) => state.transfer.transactionBalance);
  //   내 계좌 정보
  const accountBalance = useAppSelector((state) => state.transfer.myDeposit?.accountBalance);
  const accountNo = useAppSelector((state) => state.transfer.myDeposit?.accountNo);
  const accountFinalFour = accountNo?.slice(12, 16);
  //   보내는 사람 이름
  const userName = useAppSelector((state) => state.user.name);
  const formatAmount = (amount?: number): string => {
    if (!amount) return "";
    return amount.toLocaleString("ko-KR");
  };

  const [myTransactionSummary, setMyTransactionSummary] = useState<string>(
    withdrawalTransactionSummary
  );
  const [depositTransactionSummary, setDepositTransactionSummary] = useState<string | null>(
    userName
  );

  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);
  const [showCheckPasswordModal, setShowCheckPasswordModal] = useState<boolean>(false);

  const handleWriteTransactionSummary = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setDepositTransactionSummary(value);
    }
  };

  const handleWriteMySummary = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setMyTransactionSummary(value);
    }
  };

  const goToNext = () => {
    if (!myTransactionSummary || !depositTransactionSummary) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    dispatch(
      changeTransferData({
        depositTransactionSummary: depositTransactionSummary,
        withdrawalTransactionSummary: myTransactionSummary,
      })
    );
    setShowTransferModal(true);
  };

  const goToCheckPassword = () => {
    setShowTransferModal(false);
    setShowCheckPasswordModal(true);
  };

  const handleTransfer = () => {
    if (
      !depositAccountNo ||
      !depositTransactionSummary ||
      !transactionBalance ||
      !accountNo ||
      !withdrawalTransactionSummary
    ) {
      alert("계좌이체에 실패했습니다.");
      return;
    }
    setShowCheckPasswordModal(false);
    transferMutation(
      {
        depositAccountNo: depositAccountNo,
        depositTransactionSummary: depositTransactionSummary,
        transactionBalance: String(transactionBalance),
        withdrawalAccountNo: accountNo,
        withdrawalTransactionSummary: withdrawalTransactionSummary,
      },
      {
        onSuccess: (data) => {
          console.log("계좌이체 성공", data);
          dispatch(changeTransferData({ transferStep: 4, transferResponse: data }));
        },
        onError: (err) => {
          console.error("계좌이체 실패:", err);
          alert("계좌이체에 실패했습니다. 다시 시도해주세요.");
          return;
        },
      }
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between ">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <span>{withdrawalTransactionSummary}</span>
        <span className="text-xs text-gray-400">{depositAccountNo}</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-3 mt-20">
        <span className="text-3xl font-bold">{formatAmount(transactionBalance)} 원</span>
      </div>

      {/* 내 계좌 현재 잔액 + 받는 분에게 표기 + 나에게 표기 (summary) */}
      <div className="flex flex-col gap-y-3 mt-20">
        {/* 내 계좌 현재 잔액 */}
        <div className=" bg-gray-100 text-xs w-72 h-10 rounded-lg p-3">
          내 계좌 ({accountFinalFour}) : {formatAmount(Number(accountBalance))} 원
        </div>
        {/* 받는 분에게 표기 */}
        <div className=" border border-gray-200 text-xs w-72 h-10 rounded-lg p-3 flex justify-between">
          <label htmlFor="">받는 분에게 표기</label>
          <input
            type="text"
            placeholder={` ${userName ? userName : ""}`}
            className="text-end focus:outline-none"
            onChange={handleWriteTransactionSummary}
          />
        </div>
        {/* 나에게 표기  */}
        <div className=" border border-gray-200 text-xs w-72 h-10 rounded-lg p-3 flex justify-between">
          <label htmlFor="">나에게 표기</label>
          <input
            type="text"
            placeholder="미입력시 수취인명"
            className="text-end focus:outline-none"
            onChange={handleWriteMySummary}
          />
        </div>
      </div>

      <div className="w-full flex justify-center mt-20">
        <Button text="다음" onClick={goToNext} />
      </div>
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        goToCheckPassword={goToCheckPassword}
        transferName={withdrawalTransactionSummary}
        transferBalance={formatAmount(transactionBalance)}
      />
      <CheckPasswordModal
        isOpen={showCheckPasswordModal}
        onConfirm={handleTransfer}
        onClose={() => setShowCheckPasswordModal(false)}
      />
    </div>
  );
};

export default TransferStep3;
