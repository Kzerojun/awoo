"use client";

import React from "react";
import { useAppSelector } from "@/lib/store";

const DepositManageTop = () => {
  // 상품명
  const accountName = useAppSelector((state) => state.myDepositSaving.deposit?.accountName);
  // 개설일
  const accountCreatedDate = useAppSelector(
    (state) => state.myDepositSaving.deposit?.accountCreatedDate
  );
  // 잔액
  const accountBalance = useAppSelector((state) => state.myDepositSaving.deposit?.accountBalance);
  // 타입
  const accountTypeName = useAppSelector((state) => state.myDepositSaving.deposit?.accountTypeName);
  // 계좌번호
  const accountNo = useAppSelector((state) => state.myDepositSaving.deposit?.accountNo);
  // 계좌번호 포맷팅
  const formattedAccountNo = accountNo?.replace(/(\d{4})(?=\d)/g, "$1-");
  // 날짜 포맷팅
  const formatInputDate = (str: string) =>
    str ? `${str.slice(0, 4)}.${str.slice(4, 6)}.${str.slice(6, 8)}` : "";
  const formattedCreatedDate = formatInputDate(accountCreatedDate ?? "");

  return (
    <div className="w-full flex flex-col items-start justify-center p-4 mx-4">
      {/* 계좌 정보 */}
      <div className="w-full py-5 flex flex-col items-start justify-center gap-y-2 border-b border-gray-300">
        <div className="text-xs text-gray-400">{formattedAccountNo}</div>
        <div className="text-xl">내 계좌 ({accountTypeName})</div>
      </div>
      {/* 상품 정보 */}
      <div className="w-full my-4 flex justify-start items-center text-sm gap-x-8">
        <div className="flex flex-col items-start justify-center gap-y-2 font-bold">
          <span>상품명</span>
          <span>개설일</span>
          <span>출금 가능 금액</span>
        </div>
        <div className="flex flex-col  items-start justify-center gap-y-2">
          <span>{accountName}</span>
          <span>{formattedCreatedDate}</span>
          <span>{Number(accountBalance).toLocaleString("ko-KR")} 원</span>
        </div>
      </div>
    </div>
  );
};

export default DepositManageTop;
