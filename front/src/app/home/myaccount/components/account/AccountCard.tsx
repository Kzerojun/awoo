// 입출금 계좌가 이미 있는 경우
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import {
  changeClickedAccount,
  changeSelectedDepositAccountNo,
  resetSavingAccountDetailSlice,
} from "@/lib/slices/savingAccountDetailSlice";
import { getInternalAccounts } from "@/api/account/open/saving/depositlist";

interface Props {
  account: {
    accountNo: string;
    accountBalance: number;
  };
}

export default function AccountCard({ account }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deposit, setDeposit] = useState<any>(null);

  const isLoading = !account;
  // ✅ 입출금, 적금 계좌 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depositData] = await Promise.all([getInternalAccounts()]);
        dispatch(resetSavingAccountDetailSlice());
        setDeposit(depositData);
      } catch (error) {
        console.error("계좌 조회 실패", error);
      }
    };
    fetchData();
  }, []);
  // 내부 계좌 클릭 시
  const goToDepositCheckPassword = () => {
    if (!deposit) {
      alert("예금 계좌 정보를 불러올 수 없습니다.");
      return;
    }
    dispatch(changeClickedAccount("deposit"));
    dispatch(changeSelectedDepositAccountNo(deposit.accountNo));
    router.replace("/account/my/check-password");
  };

  // 계좌이체 클릭 시
  const goToTransferCheckPassword = () => {
    if (!deposit) {
      alert("예금 계좌 정보를 불러올 수 없습니다.");
      return;
    }
    dispatch(changeClickedAccount("transfer"));
    dispatch(changeSelectedDepositAccountNo(deposit.accountNo));
    router.replace("/account/my/check-password");
  };

  return (
    <div className="w-full max-w-sm bg-[#C9F5F1] rounded-2xl px-5 py-5 shadow-sm flex flex-col gap-3">
      <div onClick={goToDepositCheckPassword} className="cursor-pointer space-y-2">
        <p className="text-m font-semibold text-gray-700">AwOO 입출금계좌</p>
        {isLoading ? (
          <div className="w-28 h-6 bg-gray-300 rounded-md animate-pulse" />
        ) : (
          <p className="text-2xl font-bold">{Number(account.accountBalance).toLocaleString()}원</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToTransferCheckPassword();
          }}
          className="text-xs text-black bg-[#B3D6D3] px-4 py-1.5 rounded-md"
        >
          이체
        </button>
      </div>
    </div>
  );
}
