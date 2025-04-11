"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/store";
import DepositTop from "../components/DepositTop";
import DepositBottom from "../components/DepositBottom";
import { useDepositList } from "@/hooks/account/deposit/useGetDepositAccount";
import { DepositResponse } from "@/api/account/my/deposit";
import WalkingLoading from "@/app/walk/components/WalkingLoading";
import { getMyDeposit } from "@/lib/slices/myDepositSavingSlice";

const MyDepositPage = () => {
  const dispatch = useAppDispatch();
  const { refetch: depositListRefetch, isPending: depositPending } = useDepositList();
  const [depositList, setDepositList] = useState<DepositResponse[]>([]);
  useEffect(() => {
    const fetchDepositList = async () => {
      try {
        const result = await depositListRefetch();
        console.log("내부 계좌 목록 조회", result.data);
        if (result.isSuccess && result.data) {
          setDepositList(result.data);
          dispatch(getMyDeposit(result.data[0]));
        }
      } catch (err) {
        console.error("내부 계좌 목록 조회 실패", err);
      }
    };
    fetchDepositList();
  }, []);

  return (
    <>
      {depositList.length > 0 ? (
        <div className="flex flex-col justify-center items-center h-full w-full overscroll-none">
          <DepositTop deposit={depositList[0]} />
          <DepositBottom deposit={depositList[0]} />
        </div>
      ) : (
        <WalkingLoading />
      )}
    </>
  );
};

export default MyDepositPage;
