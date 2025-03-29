"use client";

import { useState } from "react";
import CommonTopBar from "@/common/ui/CommonTopBar";
import SavingPasswordInput from "../../saving/info/components/PasswordInput";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setDepositBalance, setLinkedAccount } from "@/lib/slices/savingSlice";
import { setActiveField, appendDigit, deleteLastDigit } from "@/lib/slices/savingPasswordSlice";
import { useKeypad } from "@/contexts/KeypadContent";
import { CheckIcon } from "@heroicons/react/24/solid";
import Button from "@/common/ui/Button";
import { getInternalAccounts } from "@/api/account/open/saving/depositlist";
import { useRouter } from "next/navigation";
import { setAccountTypeUniqueNo } from "@/lib/slices/savingSlice";
import { useEffect } from "react";

export default function SavingInfoPage() {
  const dispatch = useAppDispatch();
  const { openKeypad } = useKeypad();
  const { savingStage } = useAppSelector((state) => state.accountProgress);
  useEffect(() => {
    if (savingStage === 1) {
      dispatch(setAccountTypeUniqueNo("999-3-580e9fe62d6442"));
    } else if (savingStage === 2) {
      dispatch(setAccountTypeUniqueNo("999-3-2단계코드"));
    } else if (savingStage === 3) {
      dispatch(setAccountTypeUniqueNo("999-3-3단계코드"));
    }
  }, [savingStage, dispatch]);
  // ✅ selector를 최상단에서 한번만!
  const { password, confirmPassword } = useAppSelector((state) => state.savingPassword);
  const { withdrawalAccountNo, withdrawalBankName, withdrawalAccountName } = useAppSelector(
    (state) => state.saving
  );

  const [depositInput, setDepositInput] = useState("");
  const [expectedAmount, setExpectedAmount] = useState<number | null>(null);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const handleAutoTransferClick = () => {
    alert("해당 상품은 일일적금으로 자동이체되는 상품입니다!");
  };

  const formatWithComma = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, "");
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateExpectedAmount = (daily: number) => {
    const days = 90;
    const principal = daily * days;
    const interest = Math.floor(principal * 0.023);
    return principal + interest;
  };

  return (
    <div>
      <CommonTopBar title="정기적금 개설" leftAction="back" rightAction="cancel" />

      <div className="pt-16">
        {/* 금리 */}
        <p className="text-center text-[22px] text-aqua font-semibold mt-4">2.30%</p>

        <div className="flex flex-col gap-4 px-4 py-6">
          {/* ✅ 비밀번호 입력 */}
          <SavingPasswordInput
            onOpenPasswordKeypad={() => {
              dispatch(setActiveField("password"));
              openKeypad(
                (digit: string) => dispatch(appendDigit(digit)),
                () => dispatch(deleteLastDigit())
              );
            }}
            onOpenConfirmPasswordKeypad={() => {
              dispatch(setActiveField("confirmPassword"));
              openKeypad(
                (digit: string) => dispatch(appendDigit(digit)),
                () => dispatch(deleteLastDigit())
              );
            }}
          />

          {/* 납입금액 입력 */}
          <div>
            <p className="text-sm font-medium mb-2">납입금액 설정</p>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="text"
                value={depositInput}
                onChange={(e) => {
                  const formatted = formatWithComma(e.target.value);
                  setDepositInput(formatted);
                  dispatch(setDepositBalance(Number(formatted.replace(/,/g, ""))));
                }}
                placeholder="금액입력"
                className="flex-1 outline-none"
              />
              <span className="ml-2 text-sm text-gray-500">원</span>
            </div>
          </div>

          {/* 자동이체 */}
          <div className="flex items-center gap-2" onClick={handleAutoTransferClick}>
            <div className="w-5 h-5 flex items-center justify-center border rounded-sm bg-aqua border-aqua cursor-pointer">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">자동이체</span>
          </div>

          {/* 만기 예상액 */}
          <button
            className="bg-gray-200 rounded-md py-2 text-gray-500"
            onClick={() => {
              if (!depositInput) return alert("납입금액을 입력하세요");
              const numeric = Number(depositInput.replace(/,/g, ""));
              const result = calculateExpectedAmount(numeric);
              setExpectedAmount(result);
            }}
          >
            만기 예상액 계산
          </button>

          {expectedAmount && (
            <p className="text-right text-sm text-gray-600">
              만기 예상액: {expectedAmount.toLocaleString()}원
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
          {/* 계좌 연결 */}
          <div className="flex justify-between text-sm">
            <span>계좌 연결</span>
            {withdrawalAccountNo ? (
              // ✅ 계좌 연동 완료 시 계좌번호 표시
              <span className="text-gray-700">{withdrawalAccountNo}(AwOO뱅크)</span>
            ) : (
              // ✅ 아직 미연동이면 연동하기 버튼
              <span
                className="text-aqua cursor-pointer"
                onClick={async () => {
                  try {
                    const account = await getInternalAccounts(); // ✅ API 호출
                    if (!account) {
                      alert("연결 가능한 입출금 계좌가 없습니다.");
                      return;
                    }
                    dispatch(
                      setLinkedAccount({
                        accountNo: account.accountNo,
                        bankName: account.bankName,
                        accountName: account.accountName,
                      })
                    );
                    alert("입출금 계좌가 정상적으로 연결되었습니다!");
                  } catch (error) {
                    alert("계좌 조회 중 오류 발생");
                    console.error(error);
                  }
                }}
              >
                AwOO 입출금계좌 바로 연동
              </span>
            )}
          </div>

          {/* 다음 버튼 중앙정렬 */}
          <div className="flex justify-center mt-4">
            <Button
              text="다음"
              onClick={() => {
                router.push("/account/verify/ready");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
