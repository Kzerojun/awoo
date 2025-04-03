import React, { useState } from "react";
import Image from "next/image";
import awooAdmin from "../../../../../public/logos/AwOO_admin.svg";
import cancel from "../../../../../public/icons/admin/cancel.svg";

// API 응답 타입 정의
interface QuestionDetail {
  subject: string;
  name: string;
  content: string;
  answer: string;
}

interface QuestionDetailModalProps {
  questionId: number;
  question: QuestionDetail;
  onClose: () => void;
  onSubmit: (questionId: number, answer: string) => void;
}

export default function QuestionDetailModal({
  questionId,
  question,
  onClose,
  onSubmit,
}: QuestionDetailModalProps) {
  const [answer, setAnswer] = useState(question.answer || "");
  const isAnswered = !!question.answer; // answer가 있으면 답변 완료 상태

  // 답변 제출 핸들러
  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(questionId, answer);
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
              value={question.subject}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          {/* 작성자 */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">작성자</label>
            <input
              type="text"
              value={question.name}
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
                {isAnswered ? "답변 완료" : "답변 대기"}
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
