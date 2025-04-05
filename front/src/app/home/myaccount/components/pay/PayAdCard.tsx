"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import cardIcon from "../../../../../../public/icons/home/home-pay.png"; // 카드 아이콘 경로

export default function PayAdCard() {
  const router = useRouter();

  return (
    <div className="w-full max-w-sm bg-[#F5E7A1] rounded-2xl px-5 py-5 shadow-sm flex items-start gap-4">
      {/* 카드 아이콘 */}
      <div className="w-16 h-16 min-w-[68px] mb-4 -mt-8 ml-1 flex-shrink-0">
        <Image src={cardIcon} alt="카드 아이콘" width={68} height={68} />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col flex-1 -ml-3">
        <p className="text-xs text-gray-800">중고거래 간편결제</p>
        <p className="text-lg font-bold text-black">멍페이</p>
        <p className="text-sm text-gray-700 mt-1">안전하고 간편하게 송금하세요</p>
        <button
          onClick={() => router.push("/my/paymentRegister")}
          className="text-sm text-[#5C3A00] font-semibold mt-2 self-end"
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
