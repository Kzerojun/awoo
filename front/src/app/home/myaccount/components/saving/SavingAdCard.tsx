// ✅ SavingAdCard.tsx – 산책 적금 광고 카드
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import boneIcon from "../../../../../../public/icons/home/home_dog.png"; // 뼈다귀 아이콘 경로

export default function SavingAdCard() {
  const router = useRouter();

  return (
    <div
      className="w-full max-w-sm bg-[#FFD8D1] rounded-2xl px-5 py-5 shadow-sm flex items-start gap-2 cursor-pointer"
      onClick={() => router.push("/account/open/saving")}
    >
      {/* 뼈다귀 아이콘 */}
      <div className="w-16 h-16 min-w-[64px] -mt-8 ml-1 flex-shrink-0">
        <Image src={boneIcon} alt="적금 아이콘" width={55} height={55} />
      </div>

      <div className="flex flex-col flex-1">
        <p className="text-xs text-gray-800 ml-0.5">반려견과 함께</p>
        <p className="text-base font-bold text-gray-900">산책 리워드 적금</p>
        <p className="text-sm text-gray-700 leading-snug mt-1">꾸준히 산책하고 적금 단계를 UP !</p>
        <p className="text-sm text-[#FF5C5C] font-semibold mt-2 self-end">적금 시작하기</p>
      </div>
    </div>
  );
}
