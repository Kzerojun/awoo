"use client";

export default function SavingRecommendation() {
  return (
    <div className="p-4 py-8 bg-light-aqua rounded-lg shadow flex justify-between items-stretch h-full">
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex flex-col">
        <h2 className="text-m font-semibold">반려견과 함께하는 스마트 적금</h2>
        <p className="text-sm text-custom-black">AwOO 산책 적금 상품</p>
        <p className="text-xs text-custom-gray">Aw월킹적금</p>
      </div>

      {/* 오른쪽 아이콘 (아래 정렬) */}
      <div className="flex justify-end items-end">
        <img src="/icons/main/bank.svg" alt="은행 아이콘" className="w-16 h-16 mt-auto" />
      </div>
    </div>
  );
}
