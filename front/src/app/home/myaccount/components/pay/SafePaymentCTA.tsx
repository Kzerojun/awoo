"use client";

import { useRouter } from "next/navigation";

export default function SafePaymentCTA() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/market")}
      className="w-full max-w-sm bg-[#FFF3CD] rounded-2xl px-5 py-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex flex-col">
        <p className="text-xs text-gray-800 font-medium mb-1">중고거래가 처음이라면</p>
        <p className="text-lg font-bold text-gray-900">안심결제 하러가기</p>
        <p className="text-sm text-gray-800 mt-1">💸안전하게 돈을 보관하고 이용해보세요 </p>
        <p
          className="text-sm text-yellow-600 font-semibold mt-3 self-end"
          onClick={() => router.push("/market")}
        >
          중고거래 보러가기 →
        </p>
      </div>
    </div>
  );
}
