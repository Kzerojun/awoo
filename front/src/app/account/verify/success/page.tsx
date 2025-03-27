"use client";

import { useState } from "react";
import Image from "next/image";
import CommonTopBar from "@/common/ui/CommonTopBar";
import Checkmark from "../../../../../public/icons/mypage/checkmark.svg";
import AccountComplete from "../../open/components/AccountComplete";
import Button from "@/common/ui/Button";

export default function AccountVerifySuccessPage() {
  const [showComplete, setShowComplete] = useState(false);

  return (
    <div>
      <CommonTopBar title="계좌인증" leftAction="back" rightAction="cancel" />

      {!showComplete ? (
        <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center px-6">
          <Image src={Checkmark} alt="성공 아이콘" width={80} height={80} />
          <p className="mt-6 text-xl font-semibold">계좌 인증 완료</p>

          <Button
            className="mt-10"
            text="확인"
            width="long"
            onClick={() => setShowComplete(true)}
          />
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
