"use client";
import { DepositDetail, DepositContent } from "./MockDeposit";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TransactionDetail from "./TransactionDetail";
import { TransactionResponse } from "@/api/account/my/deposit";
import Button from "@/common/ui/Button";
import { useAppSelector } from "@/lib/store";
import { useGetTransactionList } from "@/hooks/account/deposit/useGetTransactionList";
import WalkingLoading from "@/app/walk/components/WalkingLoading";

const TransactionList = () => {
  const router = useRouter();
  const { mutate: transactionListMutation, isPending: transactionListPending } =
    useGetTransactionList();
  // 오늘 날짜 포매팅
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 1월이 0이므로 +1
  const date = String(today.getDate()).padStart(2, "0");
  const todayStr = `${year}${month}${date}`; // 20250327

  // 계좌번호
  const accountNo = useAppSelector((state) => state.myDeposit.deposit?.accountNo);

  // 계좌개설일
  const createDate = useAppSelector((state) => state.myDeposit.deposit?.accountCreatedDate);

  // 계좌 조회 시작일
  const [startDate, setStartDate] = useState<string>(createDate || "");
  // 계좌 조회 마지막 날짜
  const [endDate, setEndDate] = useState<string>(todayStr);

  // 20250327 → 2025-03-27
  const formatInputDate = (str: string) =>
    str ? `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}` : "";

  // 2025-03-27 → 20250327
  const unformatInputDate = (str: string) => str.replaceAll("-", "");

  // 거래내역 담을 state 변수
  const [transactionHistory, setTransactionHistory] = useState<TransactionResponse[]>([]);

  // 처음에는 계좌 개설일부터 오늘까지 전부 조회
  useEffect(() => {
    if (!accountNo || !createDate || !todayStr) {
      alert("거래 내역 조회에 실패했습니다. \n 다시 시도해주세요.");
      router.push("/home");
      return;
    }

    transactionListMutation(
      { accountNo, startDate: createDate, endDate: todayStr },
      {
        onSuccess: (data) => {
          setTransactionHistory(data);
        },
        onError: (err) => {
          console.error("거래 내역 조회 실패;", err);
          alert("다시 시도해주세요.");
          router.push("/home");
          return;
        },
      }
    );
  }, []);

  // 계좌 개설일
  // const createDate = DepositContent[0].accountCreatedDate;
  const formattedStartDate = `${createDate?.slice(0, 4)}-${createDate?.slice(4, 6)}-${createDate?.slice(6, 8)}`;
  const formattedTodayStr = today.toISOString().slice(0, 10); // 2025-03-27

  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const [showTransactionObject, setShowTransactionObject] = useState<TransactionResponse | null>(
    null
  );

  const showDetail = (transaction: TransactionResponse) => {
    setShowTransactionObject(transaction);
    setIsShowDetail(true);
  };

  const handleDateSearch = () => {
    if (!accountNo || !createDate || !todayStr) {
      alert("거래 내역 조회에 실패했습니다. \n 다시 시도해주세요.");
      router.push("/home");
      return;
    }

    transactionListMutation(
      { accountNo, startDate: createDate, endDate: todayStr },
      {
        onSuccess: (data) => {
          setTransactionHistory(data);
        },
        onError: (err) => {
          console.error("거래 내역 조회 실패;", err);
          alert("다시 시도해주세요.");
          router.push("/home");
          return;
        },
      }
    );
  };

  if (transactionListPending) {
    return <WalkingLoading />;
  }

  return (
    <div className="w-full h-full">
      <div className="h-[8%] w-ful flex items-center justify-between border-b-1 border-custom-gray text-sm">
        <div className="w-[80%] flex justify-between mx-2">
          <input
            type="date"
            value={formatInputDate(startDate)}
            onChange={(e) => setStartDate(unformatInputDate(e.target.value))}
            min={formatInputDate(createDate || "")}
            max={formatInputDate(endDate)}
          />

          <input
            type="date"
            value={formatInputDate(endDate)}
            onChange={(e) => setEndDate(unformatInputDate(e.target.value))}
            min={formatInputDate(startDate)}
            max={formatInputDate(todayStr)}
          />
        </div>

        <button
          onClick={handleDateSearch}
          className="bg-light-aqua text-custom-gray px-2 py-1 mr-1 rounded-2xl text-sm"
        >
          조회
        </button>
      </div>
      <div className=" w-full h-[92%] overflow-y-auto">
        {transactionHistory.map((transaction) => (
          <div
            key={transaction.transactionUniqueNo}
            className="w-full p-3 flex items-start justify-between border-b-1 border-custom-gray"
            onClick={() => showDetail(transaction)}
          >
            {/* 거래 날짜와 요약 */}
            <div className="flex items-center justify-between gap-x-4">
              <div className="text-custom-gray text-xs">{`${transaction.transactionDate.slice(4, 6)}.${transaction.transactionDate.slice(6, 8)}`}</div>
              <div className="text-sm">{transaction.transactionSummary}</div>
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
              <span className="text-custom-gray text-xs">
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
