"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import Checkmark from "../../../../../../public/icons/mypage/checkmark.svg";
import AccountComplete from "../../../open/components/AccountComplete";
import { useAppSelector } from "@/lib/store";
import { OpenSavingAccount } from "@/api/account/open/saving/openSaving";
import { resetSaving } from "@/lib/slices/savingSlice";
import { useDispatch } from "react-redux";
import { resetSavingPasswordState } from "@/lib/slices/savingPasswordSlice";
import { resetAccountProgress } from "@/lib/slices/accountProgressSlice";
import { setHasSavingAccount } from "@/lib/slices/accountStatusSlice";

export default function SavingAccountVerifySuccessPage() {
  const dispatch = useDispatch();
  const [showComplete, setShowComplete] = useState(false);
  const router = useRouter();

  // 적금 정보 store에서 가져오기
  const {
    accountTypeUniqueNo,
    depositBalance,
    withdrawalAccountNo,
    conditionsAgreement,
    password,
    petId,
  } = useAppSelector((state) => state.saving);

  // 확인 버튼 클릭 시 적금 계좌 개설 요청
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

      // 백엔드 응답에 맞춰서 필터링
      if (!response.success) {
        alert("적금 계좌 개설에 실패했습니다.");
        return; // 바로 리턴해야 함
      }

      // 진짜 성공했을 때 실행되는 코드
      // 리셋 - 개설 끝난 경우 redux 업데이트
      dispatch(setHasSavingAccount(true)); // 적금 계좌 개설 성공 처리
      dispatch(resetSaving());
      dispatch(resetAccountProgress());
      dispatch(resetSavingPasswordState());
      setShowComplete(true);
    } catch (error) {
      console.error("❌ 적금 계좌 개설 실패:", error);
      // 개설 실패한 경우 redux 마찬가지로 리셋하여 업데이트
      dispatch(resetSaving());
      dispatch(resetAccountProgress());
      dispatch(resetSavingPasswordState());
      alert("적금 계좌 개설에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonTopBar title="멍Pay" rightAction="bell" />

      {!showComplete ? (
        <div className="flex flex-col items-center px-4 pt-14">
          {/* 메인 컨텐츠 - 고정된 간격 사용 */}
          <div className="mt-[80px] mb-[100px] flex flex-col items-center">
            {/* 체크 아이콘 */}
            <div className="flex items-center justify-center mb-3 p-3 bg-teal-50 rounded-full">
              <Image src={Checkmark} alt="성공" width={95} height={95} />
            </div>

            {/* 성공 메시지 */}
            <h2 className="text-[23px] font-bold text-center mb-2">계좌 인증 완료</h2>
            <p className="text-[23px] font-bold text-center text-teal-600">
              적금 계좌 개설을 진행합니다
            </p>

            {/* 안내 메시지 */}
            <div className="mt-6 bg-gray-50 rounded-xl p-5 w-full max-w-xs">
              <p className="text-gray-700 text-center leading-relaxed text-[15px]">
                <span className="text-teal-600">멍Pay</span>의{" "}
                <span className="text-teal-600">산책 리워드 적금</span>
                <br />
                계좌 개설을 위해 버튼을 눌러주세요
              </p>
            </div>
          </div>

          {/* 계좌 개설 버튼 */}
          <div className="w-[270px] max-w-md">
            <button
              onClick={handleOpenSavingAccount}
              className="w-full py-3 bg-[#0DCFAA] rounded-lg text-white font-medium text-lg"
            >
              계좌 개설 진행
            </button>
          </div>
        </div>
      ) : (
        // 완료 컴포넌트
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
