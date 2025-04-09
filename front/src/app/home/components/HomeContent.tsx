"use client";

import { useUserHomeStatus } from "@/hooks/home/useUserHomeStatus";
import { useAppSelector } from "@/lib/store";

import OpenAccountCard from "../myaccount/components/account/OpenAccountCard";
import AccountCard from "../myaccount/components/account/AccountCard";
import SavingAdCard from "../myaccount/components/saving/SavingAdCard";
import PayAdCard from "../myaccount/components/pay/PayAdCard";
import PetRegisterCard from "../myaccount/components/pet/PetRegisterCard";
// import WalkReportPreview from "../myaccount/components/pet/WalkReportPreview";
import SavingSummaryCard from "../myaccount/components/saving/SavingSummaryCard";
import WalkReportCard from "../myaccount/components/pet/WalkReportCard";
import SafePaymentCTA from "../myaccount/components/pay/SafePaymentCTA";

import LoadingDog from "@/app/walk/components/LoadingDog";

export default function HomeContent() {
  const { status, account, isLoading, hasMongPay, savingCount } = useUserHomeStatus();
  const showSavingAd = savingCount < 3;
  const petList = useAppSelector((state) => state.user.petList ?? []);
  const hasPet = petList.length > 0;
  if (isLoading) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center">
        <LoadingDog /> {/* 강아지 애니메이션 */}
      </div>
    );
  }
  return (
    <>
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
            {!hasMongPay && <PayAdCard />}
            {hasMongPay && <SafePaymentCTA />}
            {showSavingAd && <SavingAdCard />} {/* ✅ 3개 미만이면 보여줌 */}
          </>
        )}
        {status === "WITH_PET" && account && (
          <>
            <AccountCard account={account} />
            {showSavingAd && <SavingAdCard />} {/* ✅ 3개 미만이면 보여줌 */}
            {!hasMongPay && <PayAdCard />}
            {hasMongPay && <SafePaymentCTA />}
          </>
        )}
        {status === "WITH_SAVING" && account && (
          <>
            <AccountCard account={account} />
            <SavingSummaryCard />
            {showSavingAd && <SavingAdCard />} {/* ✅ 3개 미만이면 보여줌 */}
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
            {showSavingAd && <SavingAdCard />} {/* ✅ 3개 미만이면 보여줌 */}
            {hasMongPay && <SafePaymentCTA />}
          </>
        )}
      </div>
    </>
  );
}
