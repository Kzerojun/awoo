"use client";

import { LockClosedIcon } from "@heroicons/react/24/outline";
import { QuestionItemType } from "../data/questionData";
import Link from "next/link";

interface QuestionItemProps {
  question: QuestionItemType;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  return (
    <div className="py-4 border-b border-gray-100">
      <Link href={`/my/question/${question.id}`}>
        <div className="flex items-center justify-between">
          {/* 제목과 작성자 정보 */}
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-md text-gray-800">{question.title}</h3>
              {question.isLocked && <LockClosedIcon className="h-4 w-4 text-gray-500 ml-1" />}
            </div>
            <div className="flex text-[11px] text-gray-500 mt-1">
              <span>작성자: {question.author}</span>
              <span className="mx-2">|</span>
              <span>작성일: {question.date}</span>
            </div>
          </div>

          <div className="flex items-center ml-4">
            {question.hasAnswer ? (
              <button className="px-2 py-1 rounded-md bg-teal-500 text-white text-xs">
                답변 완료
              </button>
            ) : (
              <button className="px-2 py-1 rounded-md bg-gray-200 text-gray-600 text-xs">
                답변 대기
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default QuestionItem;
