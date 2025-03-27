"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import Checkmark from "../../../../../public/icons/mypage/checkmark.svg";
import Image from "next/image";

export default function AccountVerifySuccessPage() {
  return (
    <div>
      <CommonTopBar title="계좌인증" leftAction="back" rightAction="cancel" />

      <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center text-center">
        <Image src={Checkmark} alt="성공 아이콘" width={80} height={80} />

        <p className="mt-6 text-xl font-semibold">계좌 인증 완료</p>
      </div>
    </div>
  );
}
