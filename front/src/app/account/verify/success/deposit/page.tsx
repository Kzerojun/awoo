"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import Checkmark from "../../../../../../public/icons/mypage/checkmark.svg";
import AccountComplete from "../../../open/components/AccountComplete";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { OpenDepositAccount } from "@/api/account/open/account";
import { useChangeDepositLimit } from "@/hooks/account/deposit/useChangeDepositLimit";

import { setHasDepositAccount } from "@/lib/slices/accountStatusSlice";

export default function AccountVerifySuccessPage() {
  // 계좌 개설 완료 여부 상태 (true면 완료 화면 보여줌)
  const [showComplete, setShowComplete] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redux에서 password, conditionsAgreement 가져오기
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

  // "확인" 버튼 클릭 시 실행되는 함수
  // 비밀번호 & 약관동의 데이터를 포함해 계좌 개설 API 요청
  const handleOpenAccount = async () => {
    try {
      const res = await OpenDepositAccount({ password, conditionsAgreement }); // 계좌 개설 API 호출
      setShowComplete(true); // 성공 시 완료 화면으로 전환
      setAccountNo(res.response.accountNo);
      setReadyChangeLimit(true);

      // 입출금 계좌 개설 완료 상태 Redux에 저장
      dispatch(setHasDepositAccount(true));
    } catch (error) {
      console.error("❌ 계좌 개설 실패:", error); // 실패 시 콘솔에 에러 출력
      alert("계좌 개설에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonTopBar title="계좌인증" rightAction="bell" />

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
              입출금 통장 개설을 진행합니다
            </p>

            {/* 안내 메시지 */}
            <div className="mt-6 bg-gray-50 rounded-xl p-5 w-full max-w-xs">
              <p className="text-gray-700 text-center leading-relaxed text-[15px]">
                <span className="text-teal-600">멍Pay</span>의{" "}
                <span className="text-teal-600">자유입출금 통장</span>
                <br />
                계좌 개설을 위해 버튼을 눌러주세요
              </p>
            </div>
          </div>

          {/* 계좌 개설 버튼 */}
          <div className="w-[270px] max-w-md">
            <button
              onClick={handleOpenAccount}
              className="w-full py-3 bg-[#0DCFAA] rounded-lg text-white font-medium text-lg"
            >
              계좌 개설 진행
            </button>
          </div>
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
