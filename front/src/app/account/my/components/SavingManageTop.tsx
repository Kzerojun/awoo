"use client";

import React from "react";
import { useAppSelector } from "@/lib/store";

const SavingManageTop = () => {
  const accountName = useAppSelector((state) => state.myDepositSaving.saving?.accountName);
  // 개설일
  const accountCreatedDate = useAppSelector(
    (state) => state.myDepositSaving.saving?.accountCreateDate
  );
  //   만기일
  const expiryDate = useAppSelector((state) => state.myDepositSaving.saving?.accountExpiryDate);

  // 총 적금 금액
  const accountBalance = useAppSelector((state) => state.myDepositSaving.saving?.totalBalance);
  // 적금 상품 설명
  const accountDescription = useAppSelector(
    (state) => state.myDepositSaving.saving?.accountDescription
  );
  //   적용 금리
  const interestRate = useAppSelector((state) => state.myDepositSaving.saving?.interestRate);
  //   가입한 강아지 아이디
  const petId = useAppSelector((state) => state.myDepositSaving.saving?.petId);
  // 가입 기간
  const subscriptionPeriod = useAppSelector(
    (state) => state.myDepositSaving.saving?.subscriptionPeriod
  );
  //   출금 계좌
  const withdrawalAccountNo = useAppSelector(
    (state) => state.myDepositSaving.saving?.withdrawalAccountNo
  );
  // 계좌번호
  const accountNo = useAppSelector((state) => state.myDepositSaving.saving?.accountNo);
  // 계좌번호 포맷팅
  const formattedAccountNo = accountNo?.replace(/(\d{4})(?=\d)/g, "$1-");
  // 날짜 포맷팅
  const formatInputDate = (str: string) =>
    str ? `${str.slice(0, 4)}.${str.slice(4, 6)}.${str.slice(6, 8)}` : "";
  //   개설일 포맷팅
  const formattedCreatedDate = formatInputDate(accountCreatedDate ?? "");
  // 만기일 포맷팅
  const formattedExpiryDate = formatInputDate(expiryDate ?? "");
  return (
    <div className="w-full flex flex-col items-start justify-center p-4 mx-4">
      {/* 계좌 정보 */}
      <div className="w-full py-5 flex flex-col items-start justify-center gap-y-2 border-b border-gray-300">
        <div className="text-xs text-gray-400">{formattedAccountNo}</div>
        <div className="text-xl">{accountName}</div>
      </div>
      {/* 상품 정보 */}
      <div className="w-full my-4 flex justify-start items-center text-sm gap-x-8">
        <div className="flex flex-col items-start justify-center gap-y-2">
          <span>상품명</span>
          <span>개설일</span>
          <span>만기일</span>
          <span>잔액</span>
          <span>적용금리</span>
          <span>과세구분</span>
        </div>
        <div className="flex flex-col  items-start justify-center gap-y-2">
          <span>{accountName}</span>
          <span>{formattedCreatedDate}</span>
          <span>{formattedExpiryDate}</span>
          <span>{Number(accountBalance).toLocaleString("ko-KR")} 원</span>
          <span className="text-red-500">연 {interestRate} %</span>
          <span>일반과세</span>
        </div>
      </div>
    </div>
  );
};

export default SavingManageTop;
