"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import TransferNumericPad from "./TransferNumericPad";
import { useState } from "react";
import Button from "@/common/ui/Button";
import { changeTransferData } from "@/lib/slices/transferSlice";

const TransferStep2 = () => {
  const dispatch = useAppDispatch();

  // 누구한테 보낼건지
  const depositAccountNo = useAppSelector((state) => state.transfer.depositAccountNo);
  const withdrawalTransactionSummary = useAppSelector(
    (state) => state.transfer.withdrawalTransactionSummary
  );
  //   내 계좌 정보들
  const accountName = useAppSelector((state) => state.transfer.myDeposit?.accountName);
  const accountNo = useAppSelector((state) => state.transfer.myDeposit?.accountNo);
  const accountFinalFour = accountNo?.slice(12, 16);
  // 일일 이체 한도
  const dailyTransferLimit = useAppSelector(
    (state) => state.transfer.myDeposit?.dailyTransferLimit
  );
  // 한 번에 이체할 수 있는 한도
  const oneTimeTransferLimit = useAppSelector(
    (state) => state.transfer.myDeposit?.oneTimeTransferLimit
  );
  //   계좌 잔액
  const accountBalance = useAppSelector((state) => state.transfer.myDeposit?.accountBalance);

  //   최대 입력 금액
  const MAX_AMOUT = 100_000_000;

  //   입력 금액
  const [rawAmount, setRawAmount] = useState<string>("");
  //  잔액 한도 체크
  const [isBalanceLimit, setIsBalanceLimit] = useState<boolean>(false);
  // 한 번에 보낼 때 이체 한도 체크
  const [isOneTimeLimit, setIsOneTimeLimit] = useState<boolean>(false);

  const formatAmount = (amount?: string): string => {
    if (!amount) return "";
    return Number(amount).toLocaleString("ko-KR");
  };

  const handlePadClick = (key: string) => {
    if (key === "delete") {
      setRawAmount((prev) => {
        const updated = prev.slice(0, -1);
        validateLimits(updated);
        return updated;
      });
    } else {
      setRawAmount((prev) => {
        const next = prev === "0" ? key : prev + key;
        if (Number(next) <= MAX_AMOUT) {
          validateLimits(next);
          return next;
        }
        return prev;
      });
    }
  };

  const validateLimits = (amountStr: string) => {
    const amount = Number(amountStr || "0");
    const balance = Number(accountBalance || "0");
    const oneTimeLimit = Number(oneTimeTransferLimit || "0");

    setIsBalanceLimit(amount > balance);
    setIsOneTimeLimit(amount > oneTimeLimit);
  };

  const handleSaveData = () => {
    const isValid =
      rawAmount !== "" &&
      !isBalanceLimit &&
      !isOneTimeLimit &&
      Number(rawAmount) > 0 &&
      Number(rawAmount) <= MAX_AMOUT;

    if (!isValid) {
      alert("유효한 이체 금액을 입력해주세요.");
      return;
    }
    const amountToSave = Number(rawAmount);
    console.log("저장할 금액:", amountToSave);
    dispatch(changeTransferData({ transactionBalance: amountToSave }));
    dispatch(changeTransferData({ transferStep: 3 }));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      {/* 받는 사람 정보 */}
      <div className="flex flex-col items-center justify-center gap-y-2">
        <span>{withdrawalTransactionSummary}</span>
        <span className="text-xs text-gray-400">{depositAccountNo}</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-3 mt-20">
        <input
          type="text"
          value={rawAmount ? `${formatAmount(rawAmount)} 원` : ""}
          placeholder="보낼 금액"
          className={`text-3xl w-72 placeholder:text-gray-400 placeholder:font-light text-center font-bold ${isBalanceLimit || isOneTimeLimit ? "text-red-500 font-bold" : ""}`}
          readOnly
        />
        {(isBalanceLimit || isOneTimeLimit) && (
          <span className="text-sm text-red-500 mt-2">
            {isBalanceLimit && "계좌 잔액을 초과했습니다."}
            {isOneTimeLimit && !isBalanceLimit && "1회 이체 한도를 초과했습니다."}
          </span>
        )}
      </div>
      {/* 내 계좌 현재 잔액 */}
      <div className="fixed bottom-90 bg-gray-100 text-xs w-72 h-10 rounded-lg p-3">
        내 계좌 ({accountFinalFour}) : {formatAmount(accountBalance)} 원
      </div>
      {/* 보낼 금액 */}
      <div className="w-full h-1/3 fixed bottom-18 left-0 right-0 flex justify-center items-end">
        <TransferNumericPad onClick={handlePadClick} />
      </div>
      <div className="w-full flex justify-center">
        <Button
          text="다음"
          className="fixed bottom-5 w-[90%] h-12 text-xl"
          onClick={handleSaveData}
        />
      </div>
    </div>
  );
};

export default TransferStep2;
