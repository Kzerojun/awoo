import React, { useState } from "react";
import Image from "next/image";
import { QuestionData } from "../data/mockData";
import awooAdmin from "../../../../../public/logos/AwOO_admin.svg";
import cancel from "../../../../../public/icons/admin/cancel.svg";

interface QuestionDetailModalProps {
  question: QuestionData;
  onClose: () => void;
  onSubmit: (questionId: number, answer: string) => void;
}

export default function QuestionDetailModal({
  question,
  onClose,
  onSubmit,
}: QuestionDetailModalProps) {
  const [answer, setAnswer] = useState(question.answer || "");
  const isAnswered = question.status === "답변 완료";

  // 답변 제출 핸들러
  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(question.id, answer);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative">
        {/* 모달 헤더 및 로고 */}
        <div className="flex justify-center items-center p-3 relative">
          <div className="text-teal-500 text-3xl font-bold ">
            <div className="flex items-center justify-center">
              <Image src={awooAdmin} alt="어드민 awoo" height={220} width={220} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
          >
            <Image src={cancel} alt="닫기" height={35} width={35} />
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="p-6">
          {/* 제목 */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">제목</label>
            <input
              type="text"
              value={question.title}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 작성자 */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">작성자</label>
            <input
              type="text"
              value={`${question.writer} (${question.userId})`}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 문의 내용 */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">문의 내용</label>
            <textarea
              value={question.content}
              readOnly
              className="w-full p-3 border rounded-md h-32 bg-gray-50 resize-none"
            />
          </div>

          {/* 답변 */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-medium">답변</label>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  isAnswered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {question.status}
              </span>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="답변을 입력하세요"
              className="w-full p-3 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* 확인 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition duration-200"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
