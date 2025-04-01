"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import { useGetSavingInquirePayment } from "@/hooks/account/saving/useGetSavingInquirePayment";
import WalkingLoading from "@/app/walk/components/WalkingLoading";
import { InquirePaymentResponse } from "@/api/account/my/saving";
import { PaymentInfoInterface } from "./MyAccountType";
interface AccountPayload {
  accountNo: string;
}

const SavingList = ({ accountNo }: AccountPayload) => {
  const router = useRouter();
  const {
    mutate: getSavingInquirePayment,
    data,
    isPending,
    isSuccess,
    isError,
  } = useGetSavingInquirePayment();
  // 오늘 날짜 포매팅
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 1월이 0이므로 +1
  const date = String(today.getDate()).padStart(2, "0");
  const todayStr = `${year}${month}${date}`; // 20250327

  // 적금 납입 관련 Data 담을 변수
  const [savingData, setSavingData] = useState<InquirePaymentResponse | null>(null);
  // 적금 납입 내역 담을 state 변수
  const [savingHistory, setSavingHistory] = useState<PaymentInfoInterface[] | null>(null);

  useEffect(() => {
    getSavingInquirePayment({ accountNo });
  }, [accountNo]);

  useEffect(() => {
    if (isSuccess && data) {
      setSavingData(data);
      setSavingHistory(data.paymentInfo);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      alert("다시 시도해주세요.");
      router.replace("/home");
    }
  }, [isError]);

  //   적금 계좌 개설일
  const createDate = savingData?.accountCreateDate ?? todayStr;

  // 계좌 조회 시작일
  const [startDate, setStartDate] = useState<string>(createDate || "");
  // 계좌 조회 마지막 날짜
  const [endDate, setEndDate] = useState<string>(todayStr);

  // 20250327 → 2025-03-27
  const formatInputDate = (str: string) =>
    str ? `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}` : "";

  // 2025-03-27 → 20250327
  const unformatInputDate = (str: string) => str.replaceAll("-", "");

  if (isPending) {
    return <WalkingLoading />;
  }

  return (
    <div className="w-full h-full">
      <div className="h-[10%] w-ful flex items-center justify-between border-b-1 border-gray-200 text-sm">
        <div className="w-full flex justify-end mx-2 text-gray-400">
          {formatInputDate(createDate)} ~ {formatInputDate(todayStr)}
        </div>
      </div>
      <div className=" w-full h-[92%] overflow-y-auto">
        {savingHistory?.map((saving) => (
          <div
            key={saving.depositInstallment}
            className="w-full p-3 flex items-start justify-between border-b-1 border-gray-200"
          >
            {/* 거래 날짜와 요약 */}
            <div className="flex items-center justify-between gap-x-4">
              <div className="text-custom-gray text-xs">{`${saving.paymentDate.slice(4, 6)}.${saving.paymentDate.slice(6, 8)}`}</div>
              <div className="text-sm ">{saving.depositInstallment}회차</div>
            </div>
            {/* 액수 */}
            <div className="flex flex-col items-end justify-center text-lg">
              <span className="text-aqua font-bold">
                {Number(saving.paymentBalance).toLocaleString("ko-KR")}원
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingList;
