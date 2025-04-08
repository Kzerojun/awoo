"use client";

import { useRouter } from "next/navigation";

export default function WalkReportCard() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/walk/calendar")}
      className="w-full max-w-sm bg-[#D1ECF1] rounded-2xl px-5 py-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex flex-col">
        <p className="text-xs text-gray-700 font-medium mb-1">이번 달 산책 리포트</p>
        <p className="text-lg font-bold text-gray-900">산책 캘린더로 이동</p>
        <p className="text-sm text-gray-700 mt-1">📅 일정을 등록하고 산책 기록을 확인하세요</p>
        <p
          className="text-sm text-aqua font-semibold mt-3 self-end"
          onClick={() => router.push("/my/pet/calendar")}
        >
          캘린더 보러가기 →
        </p>
      </div>
    </div>
  );
}
