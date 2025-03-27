"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import { DepositContent } from "./MockDeposit";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DepositTop = () => {
  const router = useRouter();
  const accountNo = DepositContent[0].accountNo;
  const formattedAccountNo = accountNo.replace(/(\d{4})(?=\d)/g, "$1-");
  //   const accountBalance = Number(DepositDetail[0].accountBalance);
  const accountBalance = 230000;

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

  return (
    <div className="h-1/3 mt-14 w-full flex flex-col items-center justify-center bg-aqua">
      <CommonTopBar
        title="내 계좌 (입출금)"
        rightAction="setting"
        backColor="aqua"
        onSettingClick={goToManageDeposit}
      />
      <main className="flex flex-col  justify-center items-center gap-y-10">
        <div className="flex flex-col justify-center items-center gap-y-3">
          {/* 계좌 번호 */}
          <div
            className="cursor-pointer text-sm text-gray-600 underline decoration-[1px] underline-offset-8"
            onClick={handleCopy}
          >
            {formattedAccountNo}
          </div>

          {/* 잔액 */}
          <div className="text-2xl">{accountBalance.toLocaleString("ko-KR")} 원</div>
        </div>
        {/* 이체하기 버튼 */}
        <button type="button" className="h-12 w-36 bg-gray-400/70 rounded-xl">
          이체하기
        </button>
      </main>
    </div>
  );
};

export default DepositTop;
