"use client";

import { useState, useEffect } from "react";
import CommonTopBar from "@/common/ui/CommonTopBar";
import SavingPasswordInput from "../../saving/info/components/PasswordInput";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  setDepositBalance,
  setWithdrawalAccountNo,
  setAccountTypeUniqueNo,
  setPassword,
} from "@/lib/slices/savingSlice";
import { setActiveField, appendDigit, deleteLastDigit } from "@/lib/slices/savingPasswordSlice";
import { useKeypad } from "@/contexts/KeypadContent";
import { CheckIcon } from "@heroicons/react/24/solid";
import Button from "@/common/ui/Button";
import { getInternalAccounts } from "@/api/account/open/saving/depositlist";
import { useRouter } from "next/navigation";

export default function SavingInfoPage() {
  const dispatch = useAppDispatch();
  const { openKeypad } = useKeypad();
  const router = useRouter();

  // 🟣 Store
  const { savingStage } = useAppSelector((state) => state.accountProgress);
  const { password: pinPassword } = useAppSelector((state) => state.savingPassword);
  const { withdrawalAccountNo } = useAppSelector((state) => state.saving);

  // 🟣 Local State
  const [depositInput, setDepositInput] = useState("");
  const [expectedAmount, setExpectedAmount] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isEnoughBalance, setIsEnoughBalance] = useState<boolean | null>(null);

  // ✅ savingStage 기반 정보 매핑
  const stageInfoMap = {
    1: { rate: 2.3, months: 3, accountNo: "999-3-580e9fe62d6442" },
    2: { rate: 2.8, months: 4, accountNo: "999-3-99f7323d7de844" },
    3: { rate: 3.3, months: 5, accountNo: "999-3-f44b28a58b344c" },
  } as const;

  const { rate, months, accountNo } = savingStage
    ? stageInfoMap[savingStage]
    : { rate: 0, months: 0, accountNo: "" };

  // ✅ 적금 상품 번호 자동 설정
  useEffect(() => {
    if (accountNo) dispatch(setAccountTypeUniqueNo(accountNo));
  }, [accountNo, dispatch]);

  // ✅ 공통 함수
  const formatWithComma = (value: string) =>
    value.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const calculateExpectedAmount = (daily: number) => {
    const totalDays = months * 30;
    const interest = rate / 100;
    return Math.floor(daily * totalDays * (1 + interest));
  };
  useEffect(() => {
    dispatch(setWithdrawalAccountNo(""));
    dispatch(setDepositBalance(0));
    dispatch(setPassword(""));

    setDepositInput("");
    setExpectedAmount(null);
    setBalance(null);
    setIsEnoughBalance(null);
  }, [dispatch]);

  const handleAutoTransferClick = () => alert("해당 상품은 일일적금으로 자동이체되는 상품입니다!");

  const handleLinkAccount = async () => {
    try {
      const account = await getInternalAccounts();
      if (!account) return alert("연결 가능한 입출금 계좌가 없습니다.");
      dispatch(setWithdrawalAccountNo(account.accountNo));
      setBalance(Number(account.accountBalance));
      if (depositInput) {
        const numeric = Number(depositInput.replace(/,/g, ""));
        setIsEnoughBalance(numeric <= Number(account.accountBalance));
      }
      alert("입출금 계좌가 정상적으로 연결되었습니다!");
    } catch (error) {
      alert("계좌 조회 중 오류 발생");
      console.error(error);
    }
  };

  return (
    <div>
      <CommonTopBar title="정기적금 개설" leftAction="back" />

      <div className="pt-16">
        {/* 이자율 표시 */}
        <p className="text-center text-[25px] text-aqua font-semibold mt-4">
          <span className="text-[18px] text-aqua mr-1">이자율</span>
          {rate.toFixed(1)}%
        </p>

        <div className="flex flex-col gap-4 px-4 py-6">
          {/* 비밀번호 입력 */}
          <SavingPasswordInput
            onOpenPasswordKeypad={() => {
              dispatch(setActiveField("password"));
              openKeypad(
                (digit) => dispatch(appendDigit(digit)),
                () => dispatch(deleteLastDigit())
              );
            }}
            onOpenConfirmPasswordKeypad={() => {
              dispatch(setActiveField("confirmPassword"));
              openKeypad(
                (digit) => dispatch(appendDigit(digit)),
                () => dispatch(deleteLastDigit())
              );
            }}
          />

          {/* 계좌 연결 */}
          <div className="flex justify-between text-sm">
            <span>계좌 연결</span>
            {withdrawalAccountNo ? (
              <span className="text-gray-700">{withdrawalAccountNo}(AwOO뱅크)</span>
            ) : (
              <span className="text-aqua cursor-pointer" onClick={handleLinkAccount}>
                AwOO 입출금계좌 바로 연동
              </span>
            )}
          </div>

          {/* 계좌 잔액 */}
          {withdrawalAccountNo && balance !== null && (
            <div className="flex justify-between text-sm">
              <span>계좌 잔액</span>
              <span>{balance.toLocaleString()} 원</span>
            </div>
          )}

          {/* 납입 금액 */}
          {withdrawalAccountNo && (
            <div>
              <p className="text-sm font-medium mb-2">납입금액 설정</p>
              <div className="flex items-center border rounded-md px-3 py-2">
                <input
                  type="text"
                  value={depositInput}
                  onChange={(e) => {
                    const formatted = formatWithComma(e.target.value);
                    setDepositInput(formatted);
                    const numeric = Number(formatted.replace(/,/g, ""));
                    dispatch(setDepositBalance(numeric));
                    if (balance !== null) setIsEnoughBalance(numeric <= balance);
                  }}
                  placeholder="금액입력"
                  className="flex-1 outline-none text-end"
                />
                <span className="ml-2 text-sm text-gray-500">원</span>
              </div>
              {isEnoughBalance === false && (
                <p className="text-sm text-red-500 mt-1 text-end">잔액을 확인해주세요.</p>
              )}
            </div>
          )}

          {/* 자동이체 */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleAutoTransferClick}>
            <div className="w-5 h-5 flex items-center justify-center border rounded-sm bg-aqua border-aqua">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">자동이체</span>
          </div>

          {/* 만기 예상액 */}
          {withdrawalAccountNo && (
            <button
              className="bg-aqua text-white rounded-md py-2"
              onClick={() => {
                if (!depositInput) return alert("납입금액을 입력하세요");
                const numeric = Number(depositInput.replace(/,/g, ""));
                setExpectedAmount(calculateExpectedAmount(numeric));
              }}
            >
              만기 예상액 계산
            </button>
          )}

          {expectedAmount && (
            <p className="text-right text-sm text-gray-600">
              만기 예상액: {expectedAmount.toLocaleString()}원 (예상 {months}개월)
            </p>
          )}
          {/* 적립 시작 금액 */}
          <div className="flex justify-between text-sm mt-2">
            <span>적립 시작금액</span>
            <span>{depositInput || "0"}원</span>
          </div>

          {/* 적립 방식 */}
          <div className="flex justify-between text-sm">
            <span>적립방식</span>
            <span>정기로 입금</span>
          </div>

          {/* 만기 설정 */}
          <div className="flex justify-between text-sm">
            <span>만기 설정</span>
            <span>만기시 자동해지</span>
          </div>

          {/* 다음 버튼 */}
          <div className="flex justify-center mt-4">
            <Button
              text="다음"
              onClick={() => {
                if (!depositInput) return alert("납입 금액을 입력하세요.");
                if (isEnoughBalance === false) return alert("입출금 계좌 잔액이 부족합니다.");
                dispatch(setPassword(pinPassword));
                router.push("/account/verify/ready?type=saving");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
