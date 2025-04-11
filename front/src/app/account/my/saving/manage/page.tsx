"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import CommonTopBar from "@/common/ui/CommonTopBar";
import SavingManageTop from "../../components/SavingManageTop";
import SavingManageBottom from "../../components/SavingManageBottom";
import CheckSavingInterest from "../../components/CheckSavingInterest";
import DeleteSaving from "../../components/DeleteSaving";

const MySavingManagePage = () => {
  // 적금 관리 view. 1 -> 메인, 2 -> 이자 조회, 3 -> 적금 해지
  const currentManageSavingView = useAppSelector(
    (state) => state.userAction.currentManageSavingView
  );
  return (
    <>
      {currentManageSavingView === 1 && (
        <div>
          <CommonTopBar title="적금 관리" />
          <main className="mt-14 w-full h-full flex flex-col justify-center items-center ">
            <SavingManageTop />
            <SavingManageBottom />
          </main>
        </div>
      )}
      {currentManageSavingView === 2 && (
        <div className="w-full h-[calc(100%-3.5rem)]">
          <CommonTopBar
            title="이자 조회"
            leftAction="savingManageBack"
            currentManageSavingView={currentManageSavingView}
          />
          <main className="mt-14 w-full h-full flex flex-col justify-center items-center ">
            <CheckSavingInterest />
          </main>
        </div>
      )}
      {currentManageSavingView === 3 && (
        <div className="w-full h-[calc(100%-3.5rem)]">
          <CommonTopBar
            title="적금 해지"
            leftAction="savingManageBack"
            currentManageSavingView={currentManageSavingView}
          />
          <main className="mt-14 w-full h-full flex flex-col justify-center items-center ">
            <DeleteSaving />
          </main>
        </div>
      )}
    </>
  );
};

export default MySavingManagePage;
