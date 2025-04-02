"use client";
import CommonTopBar from "@/common/ui/CommonTopBar";
import QuestionList from "./components/QuestionList";
import Link from "next/link";

export default function Question() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonTopBar title="1:1 문의" rightAction="bell" />

      <div className="pt-14 pb-20 px-4">
        {/* 문의 목록 (API로 데이터 로드) */}
        <QuestionList />

        {/* 추가 문의 안내 */}
        <div className="mt-5">
          <p className="text-gray-600 mb-4 text-lg">도움이 필요하신가요?</p>
          <div className="flex gap-2">
            <Link href="/my/question/questioning" className="flex-1">
              <button className="w-full py-2 bg-[#B2B2B2] rounded-md text-white text-sm">
                문의하기
              </button>
            </Link>
            <Link href="/my/question/myQuestion" className="flex-1">
              <button className="w-full py-2 bg-[#B2B2B2] rounded-md text-white text-sm">
                문의 내역 보기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
