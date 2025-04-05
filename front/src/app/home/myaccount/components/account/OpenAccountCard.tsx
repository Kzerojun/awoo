"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import bankIcon from "../../../../../../public/icons/home/home-bank.png"; // 은행 아이콘 경로

export default function OpenAccountCard() {
  const router = useRouter();

  return (
    <div className="w-full max-w-sm bg-[#DDF9F7] rounded-2xl px-5 py-5 shadow-sm flex items-start gap-4">
      <div className="w-16 h-16 min-w-[64px] -mt-8 -ml-2 flex-shrink-0">
        <Image src={bankIcon} alt="은행 아이콘" width={64} height={64} />
      </div>

      <div className="flex flex-col flex-1">
        <p className="text-base font-bold text-gray-800">AwOO 입출금 계좌 개설</p>
        <p className="text-sm text-gray-600 leading-snug mt-1">
          적금을 납부하고 <br /> 멍페이를 간편하게 사용해보세요.
        </p>
        <button
          onClick={() => router.push("/account/open/deposit")}
          className="text-sm text-aqua font-semibold mt-2 self-end"
        >
          개설하러 가기
        </button>
      </div>
    </div>
  );
}
