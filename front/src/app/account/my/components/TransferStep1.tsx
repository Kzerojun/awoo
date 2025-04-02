"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import Button from "@/common/ui/Button";
import { useAppDispatch } from "@/lib/store";
import { changeTransferData } from "@/lib/slices/transferSlice";
//
// {
//     "depositAccountNo": "string",  //입금 계좌번호
//     "depositTransactionSummary": "string",   //입금 계좌 메모
//     "transactionBalance": "int", //이체 금액
//     "withdrawalAccountNo": "string",     //출금 계좌번호
//     "withdrawalTransactionSummary": "string"  //출금 계좌 메모
// }
//

const TransferStep1 = () => {
  const dispatch = useAppDispatch();
  const [withdrawalTransactionSummary, setWithdrawalTransactionSummary] = useState<string>("");
  const [depositAccountNo, setDepositAccountNo] = useState<string>("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setWithdrawalTransactionSummary(value);
    }
  };

  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = String(e.target.value);
    setDepositAccountNo(value);
  };

  const handleSaveData = () => {
    if (!withdrawalTransactionSummary || !depositAccountNo) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    dispatch(
      changeTransferData({
        depositAccountNo: depositAccountNo,
        withdrawalTransactionSummary: withdrawalTransactionSummary,
        transferStep: 2,
      })
    );
  };

  return (
    <div className="mt-10 w-full flex flex-col items-center justify-center gap-y-5">
      {/* 누구에게 보내는지 (출금 계좌 메모) withdrawalTransactionSummary*/}
      <div className="w-full flex justify-center">
        <div className="w-[80%]">
          <label htmlFor="withdrawalTransactionSummary" className=" w-[80%] text-lg">
            받는 사람
          </label>
          <div className="w-full mt-3 relative">
            <input
              id="withdrawalTransactionSummary"
              type="text"
              placeholder="받는 사람 이름"
              value={withdrawalTransactionSummary}
              onChange={handleNameChange}
              className="w-full h-16  text-xl focus:outline-none px-3 border border-gray-300 rounded-xl focus:border-aqua "
            />
            {/* 글자 수 표시 */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {withdrawalTransactionSummary.length}/6
            </span>
          </div>
        </div>
      </div>
      {/* 입금할 계좌 */}
      <div className="w-full flex justify-center">
        <div className="w-[80%]">
          <label htmlFor="depositAccountNo" className="w-[80%] text-lg">
            계좌번호
          </label>
          <div className="w-full mt-3">
            <input
              id="depositAccountNo"
              type="number"
              placeholder="계좌번호"
              value={depositAccountNo}
              onChange={handleAccountChange}
              className="w-full h-16  text-xl focus:outline-none px-3 border border-gray-300 rounded-xl focus:border-aqua "
            />
          </div>
        </div>
      </div>
      <Button className="mt-5" text="확인" onClick={handleSaveData} />
    </div>
  );
};

export default TransferStep1;
