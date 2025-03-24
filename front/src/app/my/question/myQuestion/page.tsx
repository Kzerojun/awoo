"use client";
import TopBar from "@/common/ui/TopBar";
import QuestionList from "../components/QuestionList";
import { sampleQuestions } from "../data/questionData";
import Link from "next/link";

export default function MyQuestion() {
  // 김홍범 작성자 필터
  const authorFilter = (question: { author: string | string[] }) =>
    question.author.includes("김홍범");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar title="내 문의" />

      <div className="pt-14 pb-20 px-4">
        {/* 내 문의 목록 (김홍범 작성자만 필터링) */}
        <QuestionList initialQuestions={sampleQuestions} filter={authorFilter} />

        {/* 문의 작성 버튼 */}
        <div className="mt-5 flex justify-center">
          <Link href="/my/question/questioning">
            <button className="px-6 py-2 bg-teal-500 rounded-md text-white text-sm">
              새 문의 작성하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
