"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import Checkmark from "../../../../../../public/icons/mypage/checkmark.svg";
import AccountComplete from "../../../open/components/AccountComplete";
import Button from "@/common/ui/Button";
import { useAppSelector } from "@/lib/store";
import { OpenSavingAccount } from "@/api/account/open/saving/openSaving";
import { resetSaving } from "@/lib/slices/savingSlice";
import { useDispatch, UseDispatch } from "react-redux";

export default function SavingAccountVerifySuccessPage() {
  const dispatch = useDispatch();
  const [showComplete, setShowComplete] = useState(false);
  const router = useRouter();

  // ✅ 적금 정보 store에서 가져오기
  const {
    accountTypeUniqueNo,
    depositBalance,
    withdrawalAccountNo,
    conditionsAgreement,
    password,
    petId,
  } = useAppSelector((state) => state.saving);

  // ✅ 확인 버튼 클릭 시 적금 계좌 개설 요청
  const handleOpenSavingAccount = async () => {
    try {
      const response = await OpenSavingAccount({
        accountTypeUniqueNo,
        depositBalance,
        withdrawalAccountNo,
        conditionsAgreement,
        password,
        petId,
      });
      console.log("✅ 적금 계좌 개설 응답:", response);
      // ✅ 성공 시 saving slice 초기화
      dispatch(resetSaving());
      setShowComplete(true);
    } catch (error) {
      console.error("❌ 적금 계좌 개설 실패:", error);
      alert("적금 계좌 개설에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <CommonTopBar title="계좌인증" leftAction="back" rightAction="cancel" />

      {!showComplete ? (
        <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center px-6">
          <Image src={Checkmark} alt="성공 아이콘" width={80} height={80} />
          <p className="mt-6 text-xl font-semibold">계좌 인증 완료</p>
          <Button className="mt-10" text="확인" width="long" onClick={handleOpenSavingAccount} />
        </div>
      ) : (
        // ✅ 완료 컴포넌트
        <AccountComplete
          title="적금 계좌 개설완료"
          description={`적금 계좌가 개설되었습니다.\n아래 내용을 확인해주세요.`}
          info={[
            { label: "계좌종류", value: "산책 리워드 적금" },
            { label: "적립방식", value: "일일 정기적금" },
          ]}
        />
      )}
    </div>
  );
}
