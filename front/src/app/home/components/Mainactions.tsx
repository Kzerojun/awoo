"use client";

import { useRouter } from "next/navigation";

export default function MainActions() {
  const router = useRouter();
  return (
    <div className="flex justify-between space-x-2 my-2">
      {/* 입출금 계좌 개설 버튼 */}
      <button
        type="button"
        onClick={() => router.push("account/open/deposit")} // 입출금 상품 설명 페이지로 이동
        className="flex-1 p-3 bg-gray-100 rounded-lg shadow flex items-center justify-center gap-2 h-14"
      >
        <img src="/icons/main/money.svg" alt="입출금 아이콘" className="w-6 h-6" />
        <span className="text-sm text-custom-black whitespace-nowrap">입출금 계좌 개설</span>
      </button>

      {/* 적금 계좌 개설 버튼 */}
      <button
        type="button"
        className="flex-1 p-3 bg-gray-100 rounded-lg shadow flex items-center justify-center gap-2 h-14"
      >
        <img src="/icons/main/money-bag.svg" alt="적금 아이콘" className="w-6 h-6" />
        <span className="text-sm text-custom-black whitespace-nowrap">적금 계좌 개설</span>
      </button>
    </div>
  );
}
