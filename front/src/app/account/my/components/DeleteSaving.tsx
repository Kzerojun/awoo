"use client";

import Button from "@/common/ui/Button";
import React, { useEffect, useState } from "react";
import CheckPasswordModal from "./CheckPasswordModal";
import { useAppSelector } from "@/lib/store";
import { useGetEarlySavingTerminationInterest } from "@/hooks/account/saving/useGetSavingEarlyTerminationInterest";
import { useDeleteSaving } from "@/hooks/account/saving/useDeleteSaving";
import { EarlySavingTermination } from "@/api/account/my/saving";
import { useRouter } from "next/navigation";
import LoadingDog from "./JustWalkingDog";
import DeleteSavingModal from "./DeleteSavingModal";

const DeleteSaving = () => {
  const router = useRouter();
  const accountNo = useAppSelector((state) => state.myDepositSaving.saving?.accountNo);

  // 중도 해지 이자 조회
  const { mutate: earlyTerminationMutation, isPending: earlyTerminationPending } =
    useGetEarlySavingTerminationInterest();

  // 적금 해지 쿼리
  const { mutate: deleteSavingMutation, isPending: deletePending } = useDeleteSaving();

  // 중도해지 조회 시 데이터
  const [earlyInterestData, setEarlyInterestData] = useState<EarlySavingTermination | null>(null);

  useEffect(() => {
    if (!accountNo) {
      alert("다시 시도해주세요.");
      router.replace("/home");
      return;
    }
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

  // 계좌번호 포맷팅
  const formattedAccountNo = accountNo?.replace(/(\d{4})(?=\d)/g, "$1-");
  // 중도해지 조회
  // 개설일
  const createDate = earlyInterestData?.accountCreateDate;
  const formattedCreatedDate = formatInputDate(createDate ? createDate : "");
  // 적금 상품 이름
  const accountName = earlyInterestData?.accountName;
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

  const [showCheckModal, setShowCheckModal] = useState<boolean>(false);
  const [showCheckPasswordModal, setShowCheckPasswordModal] = useState<boolean>(false);
  const [showAgainCheckPassword, setShowAgainCheckPassword] = useState<boolean>(false);
  const [finalCheck, setFinalCheck] = useState<boolean>(false);

  useEffect(() => {
    if (finalCheck) {
      handleDeleteSaving();
    }
  }, [finalCheck]);

  const handleDeleteSaving = () => {
    if (!accountNo) {
      alert("다시 시도해주세요.");
      router.replace("/home");
      setShowCheckModal(false);
      setShowAgainCheckPassword(false);
      setFinalCheck(false);
      return;
    }
    alert("해지 신청");
    console.log(accountNo);
    deleteSavingMutation(
      { accountNo },
      {
        onSuccess: (data) => {
          console.log("적금 해지 성공, ", data);
          alert("적금 해지에 성공했습니다.");
          router.replace("/home");
          setShowCheckModal(false);
          setShowAgainCheckPassword(false);
          setFinalCheck(false);
        },
        onError: (err) => {
          console.error("적금 해지 실패:", err);
          alert("적금 해지에 실패했습니다. \n 다시 시도해주세요.");
          router.replace("/home");
          setShowCheckModal(false);
          setShowAgainCheckPassword(false);
          setFinalCheck(false);
        },
      }
    );
  };

  if (earlyTerminationPending || deletePending) {
    return <LoadingDog />;
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* 상단 설명 부분 */}

      <div className="w-full h-1/5 flex flex-col items-center justify-center gap-y-2">
        <span className="font-bold text-center text-lg">
          해지할 적금의 정보를 <br />
          확인해주세요.
        </span>
      </div>

      {/* 하단 변경 부분 */}
      <div className="w-full h-4/5 py-8 bg-gray-100 overflow-y-auto">
        <div className="flex flex-col items-center justify-start gap-y-5">
          {/* 조회 박스 */}
          <div className="w-[80%] border bg-white border-gray-700">
            <ul className="h-full space-y-3">
              <li className="bg-gray-200 text-sm px-2 py-1">해지할 적금 정보 확인</li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>적금상품 정보</span>
                <span className="text-sm flex flex-col items-end justify-center">
                  <span>{accountName}</span>
                  <span className="text-gray-500 text-xs">{formattedAccountNo}</span>
                </span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>개설일</span>
                <span>{formattedCreatedDate}</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>중도해지일</span>
                <span>{formattedEarlyExpiryDate}</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>만기 여부 확인</span>
                <span className="text-red-500 font-bold">중도 해지</span>
              </li>
              <li>
                <hr className="text-gray-200" />
              </li>
              <li className="px-2 flex justify-between items-center text-sm">
                <span>우대금리 조건 확인</span>
                <span className="text-red-500 font-bold">미충족 (중도해지)</span>
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

          <Button
            text="해지하기"
            onClick={() => {
              setFinalCheck(false);
              setShowCheckModal(true);
            }}
          />
        </div>
      </div>

      <DeleteSavingModal
        isOpen={showCheckModal}
        onClose={() => setShowCheckModal(false)}
        onConfirm={() => setShowCheckPasswordModal(true)}
      />

      {accountNo && (
        <CheckPasswordModal
          accountNo={accountNo}
          isOpen={showCheckPasswordModal}
          deleteType="saving"
          reCheck={showAgainCheckPassword}
          onConfirm={() => {
            if (!finalCheck) {
              setShowAgainCheckPassword(true);
            } else {
              handleDeleteSaving();
            }
          }}
          onClose={() => {
            setShowCheckPasswordModal(false);
          }}
          onFinalCheckClose={() => {
            setShowAgainCheckPassword(false);
          }}
          setFinalCheck={setFinalCheck}
        />
      )}
    </div>
  );
};
export default DeleteSaving;
