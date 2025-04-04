"use client";

import Button from "@/common/ui/Button";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import ImpossibleDeleteDepositModal from "./ImpossibleDeleteDepositModal";
import PossibleDeleteDepositModal from "./PossibleDeleteDepositModal";
import CheckPasswordModal from "./CheckPasswordModal";
import { useDeleteDeposit } from "@/hooks/account/deposit/useDeleteDeposit";
import { useRouter } from "next/navigation";
import { useGetPayRegisterCheck } from "@/hooks/account/deposit/useGetPayRegisterCheck";
import { useGetSavingAccountList } from "@/hooks/account/saving/useGetSavingAccountList";

const DeleteDeposit = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // 계좌 번호
  const accountNo = useAppSelector((state) => state.myDepositSaving.deposit?.accountNo);
  // 계좌 이름
  const accountName = useAppSelector((state) => state.myDepositSaving.deposit?.accountName);
  // 개설일
  const createdDate = useAppSelector((state) => state.myDepositSaving.deposit?.accountCreatedDate);
  // 계좌 잔액
  const accountBalance = useAppSelector((state) => state.myDepositSaving.deposit?.accountBalance);

  // 계좌 해지 쿼리
  const { mutate: deleteDepositMutation, isPending: deleteDepositPending } = useDeleteDeposit();
  // 멍페이 가입 여부 조회 쿼리
  const {
    data: payRegisterData,
    refetch: payRegisterRefetch,
    isSuccess: payRegisterSuccess,
    isError: payRegisterError,
  } = useGetPayRegisterCheck();
  // 적금 가입 목록 조회 쿼리
  const {
    data: savingListData,
    refetch: savingListRefetch,
    isSuccess: savingListSuccess,
    isError: savingListError,
  } = useGetSavingAccountList();

  // 해지할 수 있는 계좌인지 아닌지
  // const [isPossibleDelete, setIsPossibleDelete] = useState<boolean>(true); // 테스트용
  const [isPossibleDelete, setIsPossibleDelete] = useState<boolean>(false);
  const [showImpossible, setShowImpossible] = useState<boolean>(false);
  const [showPossible, setShowPossible] = useState<boolean>(false);
  // 멍페이 체크. 있으면 false, 없으면 true
  const [isPayCheck, setIsPayCheck] = useState<boolean>(false);
  // 적금 체크. 있으면 false, 없으면 true
  const [isSavingCheck, setIsSavingCheck] = useState<boolean>(false);

  // 반환 계좌
  const [refundAccountNo, setRefundAccountNo] = useState<string>("");

  // 비밀번호 체크 모달
  const [showCheckPasswordModal, setShowCheckPasswordModal] = useState<boolean>(false);
  // 비밀번호 2번 확인
  const [showAgainCheckPassword, setShowAgainCheckPassword] = useState<boolean>(false);
  const [finalCheck, setFinalCheck] = useState<boolean>(false);

  const clearState = () => {
    setIsPossibleDelete(false);
    setShowImpossible(false);
    setShowPossible(false);
    setIsPayCheck(false);
    setIsSavingCheck(false);
    setRefundAccountNo("");
    setShowCheckPasswordModal(false);
    setShowAgainCheckPassword(false);
    setFinalCheck(false);
  };

  // TODO:초기 진입 시 멍페이 계좌 확인 + 적금 확인
  useEffect(() => {
    // 멍페이 가입 여부 확인
    const fetchPayRegisterCheck = async () => {
      const res = await payRegisterRefetch();

      if (res.isSuccess && res.data?.response?.accountNo) {
        setIsPayCheck(false);
      } else {
        setIsPayCheck(true);
      }
    };
    // 적금 목록 조회
    const fetchSavingList = async () => {
      const res = await savingListRefetch();
      if (res.isSuccess && res.data) {
        if (res.data.length > 0) {
          setIsSavingCheck(false);
        } else {
          setIsSavingCheck(true);
        }
      }
    };
    fetchPayRegisterCheck();
    fetchSavingList();
  }, []);

  useEffect(() => {
    console.log("멍페이 가입 여부 통과:", isPayCheck);
    console.log("적금 가입 여부 통과:", isSavingCheck);
    if (isPayCheck && isSavingCheck) {
      setIsPossibleDelete(true);
    }
  }, [isPayCheck, isSavingCheck]);

  useEffect(() => {
    if (finalCheck) {
      handleDeleteDeposit();
    }
  }, [finalCheck]);

  // 계좌 번호 포맷팅
  const formattedAccountNo = accountNo?.replace(/(\d{4})(?=\d)/g, "$1-");
  // 날짜 포맷팅
  const formatInputDate = (str: string) =>
    str ? `${str.slice(0, 4)}.${str.slice(4, 6)}.${str.slice(6, 8)}` : "";
  const formattedCreatedDate = () => {
    if (createdDate) {
      return formatInputDate(createdDate);
    }
  };

  // 해지할 수 있는지 확인하기
  const checkDelete = () => {
    // TODO: 여기서 체크

    if (!isPayCheck || !isSavingCheck) {
      setShowPossible(false);
      setShowImpossible(true);
    } else if (isPayCheck && isSavingCheck) {
      setShowImpossible(false);
      setShowPossible(true);
    }
  };

  const handleDeleteDeposit = () => {
    if (!accountNo || !refundAccountNo) {
      alert("다시 시도해주세요.");
      router.replace("/home");
      clearState();
      return;
    }
    alert("해지 신청");
    deleteDepositMutation(
      {
        accountNo,
        refundAccountNo,
      },
      {
        onSuccess: (data) => {
          console.log("계좌해지 성공:", data);
          if (!data.response) {
            alert("계좌 해지에 실패했습니다. \n 나중에 다시 시도해주세요.");
            clearState();
            router.replace("/home");
            return;
          }
          alert("계좌 해지에 성공했습니다.");
          clearState();
          router.replace("/home");
        },
        onError: (err) => {
          console.log("계좌 해지 실패:", err);
          alert("계좌 해지에 실패했습니다. \n 나중에 다시 시도해주세요.");
          clearState();
          router.replace("/home");
        },
      }
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* 상단 설명 부분 */}

      <div className="w-full h-1/4 flex flex-col items-center justify-center gap-y-2">
        <span className="font-bold text-center text-lg">
          해지할 계좌의 정보를 <br />
          확인해주세요.
        </span>
      </div>

      {/* 하단 변경 부분 */}
      <div className="w-full h-3/4 py-8 bg-gray-100 flex flex-col items-center justify-start gap-y-5">
        {/* 조회 박스 */}
        <div className="w-[80%] border bg-white border-gray-700">
          <ul className="h-full space-y-3">
            <li className="bg-gray-200 text-sm px-2 py-1">해지할 계좌 정보 확인</li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>계좌 정보</span>
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
              <span>{formattedCreatedDate()}</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>계좌 잔액</span>
              <span>{Number(accountBalance).toLocaleString("ko-KR")} 원</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
          </ul>
        </div>
        <div className="bg-gray-200 w-[80%] p-3">
          <div>
            다음의 경우 <span className="text-red-500 font-bold">해지가 불가능</span>합니다.
          </div>
          <ul className="text-sm list-disc pl-5 py-2">
            <li className=""> 적금의 근거 계좌</li>
            <li> 멍페이 출금 계좌</li>
            <li> 입출금 정지 상태의 계좌</li>
          </ul>
        </div>

        <Button text="해지하기" className="mt-3" onClick={checkDelete} />
      </div>

      {/* 계좌를 해지할 수 없으면 안내 */}
      {!isPossibleDelete && (
        <ImpossibleDeleteDepositModal
          isOpen={showImpossible}
          onClose={() => setShowImpossible(false)}
          isPayCheck={isPayCheck}
          isSavingCheck={isSavingCheck}
        />
      )}

      {/* 계좌를 해지할 수 있으면 안내 */}
      {isPossibleDelete && (
        <PossibleDeleteDepositModal
          isOpen={showPossible}
          onClose={() => setShowPossible(false)}
          setRefundAccountNo={setRefundAccountNo}
          setShowCheckPasswordModal={setShowCheckPasswordModal}
        />
      )}
      {accountNo && (
        <CheckPasswordModal
          accountNo={accountNo}
          isOpen={showCheckPasswordModal}
          deleteType="deposit"
          reCheck={showAgainCheckPassword}
          onConfirm={() => {
            if (!finalCheck) {
              setShowAgainCheckPassword(true);
            }
          }}
          onClose={() => setShowCheckPasswordModal(false)}
          onFinalCheckClose={() => {
            setShowAgainCheckPassword(false);
          }}
          setFinalCheck={setFinalCheck}
        />
      )}
    </div>
  );
};

export default DeleteDeposit;
