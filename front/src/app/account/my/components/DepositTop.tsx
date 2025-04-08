"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import { DepositContent } from "./MockDeposit";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DepositResponse } from "@/api/account/my/deposit";

interface Props {
  deposit: DepositResponse;
}

const DepositTop = ({ deposit }: Props) => {
  const router = useRouter();
  const accountNo = deposit.accountNo;
  const formattedAccountNo = accountNo.replace(/(\d{4})(?=\d)/g, "$1-");
  const accountBalance = Number(deposit.accountBalance);

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      navigator.clipboard.writeText(accountNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      alert("클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  const goToManageDeposit = () => {
    router.push("/account/my/deposit/manage");
  };

  const goToTransfer = () => {
    router.push("/account/my/deposit/transfer");
  };

  return (
    <>
      <CommonTopBar
        title="내 계좌 (입출금)"
        rightAction="setting"
        backColor="lightAqua"
        onSettingClick={goToManageDeposit}
        textColor="white"
        backUrl="/home"
      />
      <div className="h-2/5 mt-14 w-full flex flex-col items-center justify-center bg-teal-300">
        <main className="flex flex-col  justify-center items-center gap-y-10 text-white">
          <div className="flex flex-col justify-center items-center gap-y-3">
            {/* 계좌 번호 */}
            <div
              className="cursor-pointer text-xs text-white border-b-1 border-white py-1 underline-offset-8"
              onClick={handleCopy}
            >
              {formattedAccountNo}
            </div>

            {/* 잔액 */}
            <div className="text-2xl">
              <span className="font-bold text-3xl">{accountBalance.toLocaleString("ko-KR")}</span>{" "}
              원
            </div>
          </div>
          {/* 이체하기 버튼 */}
          <button
            type="button"
            className="h-12 w-36 bg-gray-300/70 rounded-xl"
            onClick={goToTransfer}
          >
            이체하기
          </button>
        </main>
      </div>
    </>
  );
};

export default DepositTop;
