"use client";

import Button from "@/common/ui/Button";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import ImpossibleDeleteDepositModal from "./ImpossibleDeleteDepositModal";
import PossibleDeleteDepositModal from "./PossibleDeleteDepositModal";
import CheckPasswordModal from "./CheckPasswordModal";

const DeleteDeposit = () => {
  const dispatch = useAppDispatch();
  // 계좌 번호
  const accountNo = useAppSelector((state) => state.myDepositSaving.deposit?.accountNo);
  // 계좌 이름
  const accountName = useAppSelector((state) => state.myDepositSaving.deposit?.accountName);
  // 개설일
  const createdDate = useAppSelector((state) => state.myDepositSaving.deposit?.accountCreatedDate);
  // 계좌 잔액
  const accountBalance = useAppSelector((state) => state.myDepositSaving.deposit?.accountBalance);

  // 해지할 수 있는 계좌인지 아닌지
  // const [isPossibleDelete, setIsPossibleDelete] = useState<boolean>(true); // 테스트용
  const [isPossibleDelete, setIsPossibleDelete] = useState<boolean>(false);
  const [showImpossible, setShowImpossible] = useState<boolean>(false);
  const [showPossible, setShowPossible] = useState<boolean>(false);
  // 멍페이 체크. 있으면 false, 없으면 true
  const [isPayCheck, setIsPayCheck] = useState<boolean>(false);
  // 적금 체크. 있으면 false, 없으면 true
  const [isSavingCheck, setIsSavingCheck] = useState<boolean>(false);
  // 비밀번호 체크 모달
  const [showCheckPasswordModal, setShowCheckPasswordModal] = useState<boolean>(false);
  // 반환 계좌
  const [refundAccountNo, setRefundAccountNo] = useState<string>("");

  // TODO:초기 진입 시 멍페이 계좌 확인 + 적금 확인
  useEffect(() => {}, []);

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

  const handleDeleteDeposit = () => {};

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
      {accountNo && showCheckPasswordModal && (
        <CheckPasswordModal
          accountNo={accountNo}
          isOpen={showCheckPasswordModal}
          onConfirm={handleDeleteDeposit}
          onClose={() => setShowCheckPasswordModal(false)}
          className="mb-3"
        />
      )}
    </div>
  );
};

export default DeleteDeposit;
