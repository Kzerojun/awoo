"use client";

import Button from "@/common/ui/Button";
import React, { useEffect, useState } from "react";
import { useGetSavingTerminationInterest } from "@/hooks/account/saving/useGetSavingTerminationInterest";
import { useGetEarlySavingTerminationInterest } from "@/hooks/account/saving/useGetSavingEarlyTerminationInterest";
import { SavingTermination, EarlySavingTermination } from "@/api/account/my/saving";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import WalkingLoading from "@/app/walk/components/WalkingLoading";
import LoadingDog from "./JustWalkingDog";

const CheckSavingInterest = () => {
  const router = useRouter();
  const accountNo = useAppSelector((state) => state.myDepositSaving.saving?.accountNo);
  // 만기 이자 조회 쿼리
  const { mutate: terminationMutation, isPending: terminationPending } =
    useGetSavingTerminationInterest();
  // 중도 해지 이자 조회
  const { mutate: earlyTerminationMutation, isPending: earlyTerminationPending } =
    useGetEarlySavingTerminationInterest();

  // 만기해지 조회 시 데이터
  const [terminationInterestData, setTerminationInterestData] = useState<SavingTermination | null>(
    null
  );
  // 중도해지 조회 시 데이터
  const [earlyInterestData, setEarlyInterestData] = useState<EarlySavingTermination | null>(null);

  useEffect(() => {
    if (!accountNo) {
      alert("다시 시도해주세요.");
      router.replace("/home");
      return;
    }
    terminationMutation(
      { accountNo },
      {
        onSuccess: (data) => {
          setTerminationInterestData(data);
          console.log("만기 이자 조회 성공");
        },
        onError: (err) => {
          console.error("만기 이자 조회 실패:", err);
          alert("다시 시도해주세요.");
          router.replace("/home");
          return;
        },
      }
    );
    earlyTerminationMutation(
      { accountNo },
      {
        onSuccess: (data) => {
          setEarlyInterestData(data);
          console.log("중도해지 이자 조회 성공");
        },
        onError: (err) => {
          console.error("중도해지 이자 조회 실패:", err);
          alert("다시 시도해주세요.");
          router.replace("/home");
          return;
        },
      }
    );
  }, [accountNo]);

  // 날짜 포맷팅
  const formatInputDate = (str: string) =>
    str ? `${str.slice(0, 4)}.${str.slice(4, 6)}.${str.slice(6, 8)}` : "";

  // 만기 조회
  // 개설일
  const createDate = terminationInterestData?.accountCreateDate;
  const formattedCreatedDate = formatInputDate(createDate ? createDate : "");
  // 만기일
  const expiryDate = terminationInterestData?.accountExpiryDate;
  const formattedExpiryDate = formatInputDate(expiryDate ? expiryDate : "");
  // 만기 금액
  const expiryBalance = terminationInterestData?.expiryBalance;
  // 만기 이자
  const terminationInterest = terminationInterestData?.expiryInterest;
  // 만기시 총 금액
  const totalBalance = terminationInterestData?.expiryTotalBalance;
  // 이율
  const interestRate = terminationInterestData?.interestRate;

  // 중도해지 조회
  // 중도해지예상일
  const earlyExpiryDate = earlyInterestData?.earlyTerminationDate;
  const formattedEarlyExpiryDate = formatInputDate(earlyExpiryDate ? earlyExpiryDate : "");
  // 중도해지 금액
  const earlyExpiryBalance = earlyInterestData?.earlyTerminationBalance;
  // 중도해지 이자
  const earlyInterest = earlyInterestData?.earlyTerminationInterest;
  // 해지 원금
  const earlyTotalBalance = earlyInterestData?.totalBalance;
  // 중도해지시 이율
  const earlyInterestRate = earlyInterestData?.interestRate;

  if (terminationPending || earlyTerminationPending) {
    return <LoadingDog />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* 상단 설명 부분 */}

      <div className="w-full h-1/4 flex flex-col items-center justify-center gap-y-2 ">
        <span className="font-bold">적금 이자를 조회합니다.</span>

        <div className="text-center text-sm">
          중도 해지 예상일은 <span className="text-aqua font-bold">오늘</span>입니다.
        </div>
      </div>

      {/* 하단 조회 부분 */}
      <div className="w-full h-3/4 bg-gray-100 overflow-y-auto ">
        <div className="flex flex-col items-center justify-center gap-y-10 py-10">
          {/* 만기 해지 이자 조회 박스 */}
          <div className="w-[80%] border bg-white border-gray-700">
            <ul className="h-full space-y-3">
              <li className="bg-gray-200 text-sm px-2 py-1">이자 조회</li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>개설일</span>
                <span>{formattedCreatedDate}</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>만기일</span>
                <span>{formattedExpiryDate}</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>적용이율</span>
                <span className="font-bold text-aqua">{interestRate}%</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>만기금액</span>
                <span>{Number(expiryBalance).toLocaleString("ko-KR")} 원</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>만기이자</span>
                <span>{Number(terminationInterest).toLocaleString("ko-KR")} 원</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>만기시 총 금액</span>
                <span>{Number(totalBalance).toLocaleString("ko-KR")} 원</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
            </ul>
          </div>
          {/* 중도 해지 이자 조회 박스 */}
          <div className="w-[80%] border bg-white border-gray-700">
            <ul className="h-full space-y-3">
              <li className="bg-gray-200 text-sm px-2 py-1">중도 해지 이자 조회</li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>개설일</span>
                <span>{formattedCreatedDate}</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>해지 예상일</span>
                <span>{formattedEarlyExpiryDate}</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>적용이율</span>
                <span className="font-bold text-aqua">{earlyInterestRate}%</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>중도해지 원금</span>
                <span>{Number(earlyTotalBalance).toLocaleString("ko-KR")} 원</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>중도해지시 이자</span>
                <span>{Number(earlyInterest).toLocaleString("ko-KR")} 원</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>중도해지시 총 금액</span>
                <span>{Number(earlyExpiryBalance).toLocaleString("ko-KR")} 원</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckSavingInterest;
