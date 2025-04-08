"use client";

import { useUserHomeStatus } from "@/hooks/home/useUserHomeStatus";
import { useAppSelector } from "@/lib/store";

import OpenAccountCard from "../myaccount/components/account/OpenAccountCard";
import AccountCard from "../myaccount/components/account/AccountCard";
import SavingAdCard from "../myaccount/components/saving/SavingAdCard";
import PayAdCard from "../myaccount/components/pay/PayAdCard";
import PetRegisterCard from "../myaccount/components/pet/PetRegisterCard";
import WalkReportPreview from "../myaccount/components/pet/WalkReportPreview";
import SavingSummaryCard from "../myaccount/components/saving/SavingSummaryCard";
import WalkReportCard from "../myaccount/components/pet/WalkReportCard";
import SafePaymentCTA from "../myaccount/components/pay/SafePaymentCTA";

export default function HomeContent() {
  const { status, account, isLoading, hasMongPay } = useUserHomeStatus();
  const petList = useAppSelector((state) => state.user.petList ?? []);
  const hasPet = petList.length > 0;

  if (isLoading) {
    return <div className="px-1 py-4 text-sm text-gray-500">로딩 중...</div>;
  }

  return (
    <div className="px-1 space-y-3">
      {status === "NEWBIE" && (
        <>
          <OpenAccountCard />
          <SavingAdCard />
          <PayAdCard />
          <PetRegisterCard />
        </>
      )}

      {status === "ONLY_DEPOSIT" && account && (
        <>
          <AccountCard account={account} />
          <PetRegisterCard />
          <SavingAdCard />
          {!hasMongPay && <PayAdCard />}
          {hasMongPay && <SafePaymentCTA />}
        </>
      )}

      {status === "WITH_PET" && account && (
        <>
          <AccountCard account={account} />
          <SavingAdCard />
          {!hasMongPay && <PayAdCard />}
          {hasMongPay && <SafePaymentCTA />}
        </>
      )}

      {status === "WITH_SAVING" && account && (
        <>
          <AccountCard account={account} />
          <SavingSummaryCard />
          {!hasMongPay && <PayAdCard />}
          {hasPet && <WalkReportCard />}
          {hasMongPay && <SafePaymentCTA />}
        </>
      )}

      {status === "COMPLETE" && account && (
        <>
          <AccountCard account={account} />
          <SavingSummaryCard />
          {hasPet && <WalkReportCard />}
          {hasMongPay && <SafePaymentCTA />}
        </>
      )}
    </div>
  );
}
