"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import Checkmark from "../../../../../public/icons/mypage/checkmark.svg";
import AccountComplete from "../../../open/components/AccountComplete";
import Button from "@/common/ui/Button";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setAccountVerified } from "@/lib/slices/accountSlice";
import { OpenDepositAccount } from "@/api/account/open/account";

export default function AccountVerifySuccessPage() {
  // ✅ 계좌 개설 완료 여부 상태 (true면 완료 화면 보여줌)
  const [showComplete, setShowComplete] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // ✅ Redux에서 password, conditionsAgreement 가져오기
  const { password, conditionsAgreement } = useAppSelector((state) => state.account);

  // ✅ 컴포넌트 마운트 시 Redux에 계좌 인증 완료 상태 저장
  useEffect(() => {
    dispatch(setAccountVerified(true));
  }, [dispatch]);

  // ✅ "확인" 버튼 클릭 시 실행되는 함수
  // 👉 비밀번호 & 약관동의 데이터를 포함해 계좌 개설 API 요청
  const handleOpenAccount = async () => {
    try {
      await OpenDepositAccount({ password, conditionsAgreement }); // 계좌 개설 API 호출
      setShowComplete(true); // 성공 시 완료 화면으로 전환
    } catch (error) {
      console.error("❌ 계좌 개설 실패:", error); // 실패 시 콘솔에 에러 출력
      alert("계좌 개설에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {/* ✅ 공통 상단 바 */}
      <CommonTopBar title="계좌인증" leftAction="back" rightAction="cancel" />

      {/* ✅ 계좌 개설 완료 여부에 따른 화면 분기 */}
      {!showComplete ? (
        <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center px-6">
          <Image src={Checkmark} alt="성공 아이콘" width={80} height={80} />
          <p className="mt-6 text-xl font-semibold">계좌 인증 완료</p>
          {/* ✅ 확인 버튼 클릭 시 계좌 개설 시도 */}
          <Button className="mt-10" text="확인" width="long" onClick={handleOpenAccount} />
        </div>
      ) : (
        // ✅ 계좌 개설 성공 시 보여주는 컴포넌트
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
