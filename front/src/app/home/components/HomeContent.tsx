"use client";

import { useUserHomeStatus } from "@/hooks/home/useUserHomeStatus";
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";

import OpenAccountCard from "../myaccount/components/account/OpenAccountCard";
import AccountCard from "../myaccount/components/account/AccountCard";
import SavingAdCard from "../myaccount/components/saving/SavingAdCard";
import PayAdCard from "../myaccount/components/pay/PayAdCard";
import PetRegisterCard from "../myaccount/components/pet/PetRegisterCard";
import WalkReportPreview from "../myaccount/components/pet/WalkReportPreview";

import { getInternalAccounts } from "@/api/account/open/saving/depositlist";

export default function HomeContent() {
  const status = useUserHomeStatus();
  console.log("현재 유저 홈 상태:", status);

  const petList = useAppSelector((state) => state.user.petList ?? []);
  const hasPet = petList.length > 0;

  const [account, setAccount] = useState<{ accountNo: string; accountBalance: number } | null>(
    null
  );

  useEffect(() => {
    const fetch = async () => {
      if (status !== "NEWBIE") {
        try {
          const res = await getInternalAccounts();
          setAccount(res);
        } catch (err) {
          console.error("입출금 계좌 정보 조회 실패:", err);
        }
      }
    };
    fetch();
  }, [status]);

  return (
    <div className="px-1 space-y-3">
      {status === "NEWBIE" && (
        <>
          <OpenAccountCard />
          <SavingAdCard />
          <PayAdCard />
          <WalkReportPreview />
          <PetRegisterCard />
        </>
      )}

      {status === "ONLY_DEPOSIT" && account && (
        <>
          <AccountCard account={account} />
          <SavingAdCard />
          <PayAdCard />
          <WalkReportPreview />
        </>
      )}

      {status === "WITH_SAVING" && account && (
        <>
          <AccountCard account={account} />
          <PayAdCard />
        </>
      )}

      {status === "COMPLETE" && account && (
        <>
          <AccountCard account={account} />
        </>
      )}
    </div>
  );
}
