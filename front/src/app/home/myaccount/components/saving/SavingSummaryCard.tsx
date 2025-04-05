"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSavingList } from "@/api/account/open/saving/savingList"; // 적금 계좌 조회 API
import { useDispatch } from "react-redux";
import {
  changeClickedAccount,
  changeSelectedSavingAccountNo,
  resetSavingAccountDetailSlice,
  setSelectedSavingId,
} from "@/lib/slices/savingAccountDetailSlice";

export default function SavingSummaryCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [savingAccount, setSavingAccount] = useState<{
    accountNo: string;
    balance: number;
    interestRate: number;
  } | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getSavingList(); // API 연동
        setSavingAccount(data);
      } catch (err) {
        console.error("적금 계좌 조회 실패:", err);
      }
    };
    fetch();
  }, []);

  const isLoading = !savingAccount;

  const goToSavingDetail = () => {
    if (!savingAccount) return;
    dispatch(changeClickedAccount("saving"));
    dispatch(changeSelectedSavingAccountNo(savingAccount.accountNo));
    router.push("/account/my/check-password");
  };

  return (
    <div
      className="w-full max-w-sm bg-[#FFEBD6] rounded-2xl px-5 py-5 shadow-sm flex flex-col gap-3"
      onClick={goToSavingDetail}
    >
      <p className="text-m font-semibold text-gray-700">산책 리워드 적금</p>
      {isLoading ? (
        <div className="w-32 h-6 bg-gray-300 rounded-md animate-pulse" />
      ) : (
        <>
          <p className="text-xl font-bold">{Number(savingAccount.balance).toLocaleString()}원</p>
          <p className="text-sm text-gray-600">이자율 {savingAccount.interestRate}%</p>
        </>
      )}
    </div>
  );
}
