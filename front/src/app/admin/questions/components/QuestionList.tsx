import React from "react";
import { QuestionData } from "../data/mockData";

interface QuestionListProps {
  questions: QuestionData[];
  onViewDetail: (question: QuestionData) => void;
}

export default function QuestionList({ questions, onViewDetail }: QuestionListProps) {
  // 행 클릭 핸들러
  const handleRowClick = (question: QuestionData) => {
    onViewDetail(question);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-4 text-left text-gray-600 font-medium">제목</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">작성자</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">작성일</th>
            <th className="px-6 py-4 text-center text-gray-600 font-medium">처리</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr
              key={question.id}
              className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                index !== questions.length - 1 ? "border-b border-gray-100" : ""
              }`}
              onClick={() => handleRowClick(question)}
            >
              <td className="px-6 py-4">
                <div className="font-medium text-gray-800">{question.title}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-gray-700">{question.writer}</div>
                <div className="text-sm text-gray-500">{question.userId}</div>
              </td>
              <td className="px-6 py-4 text-gray-700">{question.date}</td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium inline-block
                  ${
                    question.status === "답변 대기"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {question.status}
                </span>
              </td>
            </tr>
          ))}

          {/* 데이터가 없을 경우 메시지 표시 */}
          {questions.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                등록된 문의사항이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 페이지네이션 - 필요 시 추가 구현 */}
    </div>
  );
}
