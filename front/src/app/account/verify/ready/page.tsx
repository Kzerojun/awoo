"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import Button from "@/common/ui/Button";
import { PhoneIcon, BanknotesIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
export default function ReadyPage() {
  const router = useRouter();
  return (
    <div>
      <CommonTopBar title="신청 전 확인사항" leftAction="back" rightAction="cancel" />

      <div className="pt-16 px-4 flex flex-col gap-6">
        <h2 className="text-lg font-bold">시작 전 준비해 주세요</h2>

        {/* 준비물: 휴대폰 */}
        <div className="flex items-center gap-3 ml-2">
          <PhoneIcon className="w-6 h-6 text-aqua" />
          <p className="text-sm text-gray-700">본인명의 휴대폰</p>
        </div>

        {/* 준비물: 계좌번호 */}
        {/* <div className="flex items-center gap-3 ml-2">
          <BanknotesIcon className="w-6 h-6 text-aqua" />
          <p className="text-sm text-gray-700">개인 송금 인증을 위한 타인 계좌번호</p>
        </div> */}

        {/* 알아두세요 */}
        <div className="flex items-center gap-2 mt-6 ml-2">
          <ExclamationCircleIcon className="w-5 h-5 text-gray-500" />
          <p className="text-sm font-medium text-gray-700">알아두세요</p>
        </div>
        <p className="ml-8">추후에 문구 추가 예정</p>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-80 flex justify-center">
        <Button
          text="다음"
          onClick={() => {
            router.push("/account/verify/phone?type=saving");
          }}
        />
      </div>
    </div>
  );
}
