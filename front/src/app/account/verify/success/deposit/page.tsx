"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import Checkmark from "../../../../../../public/icons/mypage/checkmark.svg";
import AccountComplete from "../../../open/components/AccountComplete";
import Button from "@/common/ui/Button";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setAccountVerified } from "@/lib/slices/accountSlice";
import { OpenDepositAccount } from "@/api/account/open/account";
import { useChangeDepositLimit } from "@/hooks/account/deposit/useChangeDepositLimit";

import { setHasDepositAccount } from "@/lib/slices/accountStatusSlice";
export default function AccountVerifySuccessPage() {
  // ✅ 계좌 개설 완료 여부 상태 (true면 완료 화면 보여줌)
  const [showComplete, setShowComplete] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // ✅ Redux에서 password, conditionsAgreement 가져오기
  const { password, conditionsAgreement } = useAppSelector((state) => state.account);

  // 1일 한도 이체 -> 100만원, 1회 이체 한도 -> 100만원
  const dailyLimit = 1000000;
  const oneTimeLimit = 1000000;
  // 계좌이체 한도 변경 쿼리
  const { mutate: changeDepositLimitMutation, isPending: changeDepositLimitPending } =
    useChangeDepositLimit();
  // 개설 후 계좌번호 조회
  const [accountNo, setAccountNo] = useState<string | null>(null);
  const [readyChangeLimit, setReadyChangeLimit] = useState<boolean>(false);
  // ✅ 컴포넌트 마운트 시 Redux에 계좌 인증 완료 상태 저장
  useEffect(() => {
    dispatch(setAccountVerified(true));
  }, [dispatch]);

  // 이체 한도 변경 준비 완료되면 변경
  useEffect(() => {
    if (!accountNo) {
      console.log("이체 한도 변경 실패");
      return;
    }
    changeDepositLimitMutation(
      {
        accountNo,
        oneTimeTransferLimit: oneTimeLimit,
        dailyTransferLimit: dailyLimit,
      },
      {
        onSuccess: (data) => {
          console.log("이체한도 변경 성공:", data);
        },
        onError: (err) => {
          console.error("이체 한도 변경 실패:", err);
        },
      }
    );
  }, [readyChangeLimit]);

  // ✅ "확인" 버튼 클릭 시 실행되는 함수
  // 👉 비밀번호 & 약관동의 데이터를 포함해 계좌 개설 API 요청
  const handleOpenAccount = async () => {
    try {
      const res = await OpenDepositAccount({ password, conditionsAgreement }); // 계좌 개설 API 호출
      setShowComplete(true); // 성공 시 완료 화면으로 전환
      setAccountNo(res.response.accountNo);
      setReadyChangeLimit(true);

      // ✅ 입출금 계좌 개설 완료 상태 Redux에 저장
      dispatch(setHasDepositAccount(true));
    } catch (error) {
      console.error("❌ 계좌 개설 실패:", error); // 실패 시 콘솔에 에러 출력
      alert("계좌 개설에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {/* ✅ 계좌 개설 중일 때만 상단바 노출 */}
      {!showComplete && <CommonTopBar title="계좌인증" leftAction="back" rightAction="cancel" />}

      {!showComplete ? (
        <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center px-6">
          <Image src={Checkmark} alt="성공 아이콘" width={80} height={80} />
          <p className="mt-6 text-xl font-semibold">계좌 인증 완료</p>
          <Button className="mt-10" text="확인" width="long" onClick={handleOpenAccount} />
        </div>
      ) : (
        <AccountComplete
          title="입출금통장 개설완료"
          description={`입출금 통장이 개설되었습니다.\n아래의 내용을 확인해주세요.`}
          info={[
            { label: "계좌종류", value: "자유입출금" },
            { label: "앱 이체한도", value: "1일 한도 최대 100만원" },
          ]}
        />
      )}
    </div>
  );
}
