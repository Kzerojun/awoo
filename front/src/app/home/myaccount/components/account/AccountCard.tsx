"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import {
  changeClickedAccount,
  changeSelectedDepositAccountNo,
  resetSavingAccountDetailSlice,
} from "@/lib/slices/savingAccountDetailSlice";

interface Props {
  account: {
    accountNo: string;
    accountBalance: number;
  };
}

export default function AccountCard({ account }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const goToCheckPassword = (type: "deposit" | "transfer") => {
    dispatch(resetSavingAccountDetailSlice());
    dispatch(changeClickedAccount(type));
    dispatch(changeSelectedDepositAccountNo(account.accountNo));
    router.replace("/account/my/check-password");
  };

  return (
    <div className="w-full max-w-sm bg-[#C9F5F1] rounded-2xl px-5 py-5 shadow-sm flex flex-col gap-3">
      <div onClick={() => goToCheckPassword("deposit")} className="cursor-pointer space-y-2">
        <p className="text-m font-semibold text-gray-700">AwOO 입출금계좌</p>
        <p className="text-2xl font-bold">{Number(account.accountBalance).toLocaleString()}원</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToCheckPassword("transfer");
          }}
          className="text-xs text-black bg-[#B3D6D3] px-4 py-1.5 rounded-md"
        >
          이체
        </button>
      </div>
    </div>
  );
}
