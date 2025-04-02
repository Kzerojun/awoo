"use client";
import React, { useEffect } from "react";
import SavingTop from "../components/SavingTop";
import SavingBottom from "../components/SavingBottom";
import { useAppSelector } from "@/lib/store";
import WalkingLoading from "@/app/walk/components/WalkingLoading";
import { useGetSavingAccount } from "@/hooks/account/saving/useGetSavingAccount";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";

const MySavingPage = () => {
  const router = useRouter();

  const savingId = String(useAppSelector((state) => state.savingAccountDetail.selectedSavingId));
  const { data: savingInfo, isLoading, isError } = useGetSavingAccount(savingId ?? "");

  useEffect(() => {
    if (isError) {
      alert("적금 정보를 불러올 수 없습니다. 다시 시도해주세요.");
      router.replace("/home");
    }
  }, [isError, isLoading, savingInfo, router]);

  if (isLoading || !savingInfo) {
    return <WalkingLoading />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <SavingTop savingInfo={savingInfo} />
      <SavingBottom savingInfo={savingInfo} />
    </div>
  );
};

export default MySavingPage;
