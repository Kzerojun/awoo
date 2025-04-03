"use client";

import React, { useState, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Button from "@/common/ui/Button";
import CheckPasswordModal from "./CheckPasswordModal";
import { changeCurrentManageDepositView } from "@/lib/slices/userActionSlice";

const ChangeDepositLimit = () => {
  const dispatch = useAppDispatch();
  const accountNo = useAppSelector((state) => state.myDepositSaving.deposit?.accountNo);
  const oneTimeTransferLimit = useAppSelector(
    (state) => state.myDepositSaving.deposit?.oneTimeTransferLimit
  );
  const dailyTransferLimit = useAppSelector(
    (state) => state.myDepositSaving.deposit?.dailyTransferLimit
  );

  //   이체 한도 변경 제한 -> 천만원
  const MAX_LIMIT = 10_000_000;

  const [dailyLimit, setDailyLimit] = useState<number | null>(null);
  const [oneTimeLimit, setOneTimeLimit] = useState<number | null>(null);

  const isDailyLimitExceeded = dailyLimit !== null && dailyLimit > MAX_LIMIT;
  const isOneTimeLimitExceeded = oneTimeLimit !== null && oneTimeLimit > MAX_LIMIT;

  const [showCheckPasswordModal, setShowCheckPasswordModal] = useState<boolean>(false);

  const formatNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return Number(numericValue).toLocaleString("ko-KR");
  };

  const handleDailyLimit = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const numeric = Number(raw);

    if (numeric <= MAX_LIMIT) {
      setDailyLimit(numeric);
    }
  };

  const handleOneTimeLimit = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const numeric = Number(raw);

    if (numeric <= MAX_LIMIT) {
      setOneTimeLimit(numeric);
    }
  };

  const successChangeLimit = () => {
    // TODO: 계좌 이체 한도 변경 함수 호출

    setShowCheckPasswordModal(false);
    dispatch(changeCurrentManageDepositView(1));
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* 상단 설명 부분 */}

      <div className="w-full h-1/4 flex flex-col items-center justify-center gap-y-2">
        <span className="font-bold">원하시는 이체 한도를 입력하세요.</span>

        <div className="text-center text-sm">
          최대 <span className="text-aqua font-bold">1일 1,000만 원, 1회 1,000만 원 </span>까지{" "}
          <br />
          설정 가능합니다.
        </div>
      </div>

      {/* 하단 변경 부분 */}
      <div className="w-full h-3/4 bg-gray-100 flex flex-col items-center justify-center gap-y-10">
        {/* 조회 박스 */}
        <div className="w-[80%] border bg-white border-gray-700">
          <ul className="h-full space-y-3">
            <li className="bg-gray-200 text-sm px-2 py-1">현재 이체 한도</li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>1일</span>
              <span> {Number(dailyTransferLimit).toLocaleString("ko-KR")} 원</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>1회</span>
              <span>{Number(oneTimeTransferLimit).toLocaleString("ko-KR")} 원</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
          </ul>
        </div>

        {/* 변경 박스 */}
        <div className="w-[80%] border bg-white border-gray-700">
          <ul className="h-full space-y-3">
            <li className="bg-gray-200 text-sm px-2 py-1">변경할 이체 한도</li>
            <li className="px-2 flex justify-between items-center text-sm">
              {/* 1일 이체 한도 */}
              <span className="">1일</span>
              <span className="flex flex-col items-end justify-center">
                <span>
                  <input
                    type="text"
                    placeholder="금액 입력"
                    className="text-end focus:outline-none"
                    value={
                      dailyLimit !== null && dailyLimit !== 0
                        ? dailyLimit.toLocaleString("ko-KR")
                        : ""
                    }
                    onChange={handleDailyLimit}
                  />
                  &nbsp; 원
                </span>
                <span className="text-xs">최대 1,000만 원</span>
              </span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
            {/* 1회 이체 한도 */}
            <li className="px-2 flex justify-between items-center text-sm">
              <span>1회</span>
              <span className="flex flex-col items-end justify-center">
                <span>
                  <input
                    type="text"
                    placeholder="금액 입력"
                    className="text-end focus:outline-none"
                    value={
                      oneTimeLimit !== null && oneTimeLimit !== 0
                        ? oneTimeLimit.toLocaleString("ko-KR")
                        : ""
                    }
                    onChange={handleOneTimeLimit}
                  />
                  &nbsp; 원
                </span>

                <span className="text-xs">최대 1,000만 원</span>
              </span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
          </ul>
        </div>

        <Button text="변경하기" onClick={() => setShowCheckPasswordModal(true)} />
      </div>
      {accountNo && (
        <CheckPasswordModal
          accountNo={accountNo}
          isOpen={showCheckPasswordModal}
          onConfirm={successChangeLimit}
          onClose={() => setShowCheckPasswordModal(false)}
          className="mb-3"
        />
      )}
    </div>
  );
};

export default ChangeDepositLimit;
