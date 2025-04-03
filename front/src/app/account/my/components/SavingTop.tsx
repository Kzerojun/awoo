"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SavingResponse } from "@/api/account/my/saving";

interface SavingProps {
  savingInfo: SavingResponse;
}

const SavingTop = ({ savingInfo }: SavingProps) => {
  const router = useRouter();

  const formatInputDate = (str: string) =>
    str ? `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}` : "";

  const calculateRemainingDays = (expiryDateStrInput: string | number): number => {
    const expiryDateStr = String(expiryDateStrInput);

    const today = new Date();
    const expiryDate = new Date(
      Number(expiryDateStr.slice(0, 4)),
      Number(expiryDateStr.slice(4, 6)) - 1,
      Number(expiryDateStr.slice(6, 8))
    );
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const remainingDays = calculateRemainingDays(savingInfo.accountExpiryDate);

  // 목표 UI
  // 전체 시간
  const calculateTotalDays = (startStr: string, endStr: string): number => {
    const start = new Date(
      Number(startStr.slice(0, 4)),
      Number(startStr.slice(4, 6)) - 1,
      Number(startStr.slice(6, 8))
    );

    const end = new Date(
      Number(endStr.slice(0, 4)),
      Number(endStr.slice(4, 6)) - 1,
      Number(endStr.slice(6, 8))
    );
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  // 경과 시간
  const calculatedPassDays = (startStr: string): number => {
    const start = new Date(
      Number(startStr.slice(0, 4)),
      Number(startStr.slice(4, 6)) - 1,
      Number(startStr.slice(6, 8))
    );
    const today = new Date();
    return Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const totalDays = calculateTotalDays(savingInfo.accountCreateDate, savingInfo.accountExpiryDate);

  const passedDays = calculatedPassDays(savingInfo.accountCreateDate);

  return (
    <>
      <CommonTopBar
        title={savingInfo.accountName}
        rightAction="setting"
        backColor="green"
        textColor="white"
      />
      <div className="h-2/5 mt-14 w-full flex flex-col items-center justify-center bg-green">
        <main className="flex flex-col  justify-center items-center gap-y-8">
          <div className="flex flex-col justify-center items-center gap-y-3">
            {/* 적용 금리 */}
            <div className="text-white flex items-center gap-x-3">
              <span>적용금리</span>
              <span>{savingInfo.interestRate}%</span>
            </div>
            {/* 잔액 */}
            <div className="text-2xl text-white">
              <span className="font-bold text-3xl">
                {Number(savingInfo.totalBalance).toLocaleString("ko-KR")}
              </span>{" "}
              원
            </div>
            <div className="flex flex-col gap-y-1 text-xs text-white">
              {/* 개설일 */}

              <div>
                <span>개설일 | </span>
                <span>{formatInputDate(savingInfo.accountCreateDate)}</span>
              </div>
              {/* 만기일 */}
              <div>
                <span>만기일 | </span>
                <span>{formatInputDate(savingInfo.accountExpiryDate)}</span>
              </div>
            </div>
          </div>
          {/* 말풍선 */}
          <div className="relative w-full mt-10">
            <div
              className="absolute left-0 -top-8 bg-white text-green text-xs font-bold px-3 py-1 rounded-full shadow"
              style={{
                left: `${(passedDays / totalDays) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              D-{remainingDays}
            </div>
            {/* 바 배경 */}
            <div className="w-72 h-1.5 bg-gray-300 rounded-full overflow-hidden">
              {/* 진행된 바 */}
              <div
                className="h-full bg-light-green transition-all duration-700 ease-in-out"
                style={{ width: `${(passedDays / totalDays) * 100}%` }}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SavingTop;
