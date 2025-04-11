import React from "react";

// API 응답 타입 정의
interface QuestionListItem {
  questionId: number;
  name: string;
  email: string;
  subject: string;
  createdAt: string;
  isAnswer: boolean;
}

interface QuestionListProps {
  questions: QuestionListItem[];
  onViewDetail: (questionId: number) => void;
}

export default function QuestionList({ questions, onViewDetail }: QuestionListProps) {
  // 행 클릭 핸들러
  const handleRowClick = (questionId: number) => {
    onViewDetail(questionId);
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-4 text-left text-gray-600 font-medium">작성자</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">제목</th>
            <th className="px-6 py-4 text-left text-gray-600 font-medium">작성일</th>
            <th className="px-6 py-4 text-center text-gray-600 font-medium">처리</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr
              key={question.questionId}
              className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                index !== questions.length - 1 ? "border-b border-gray-100" : ""
              }`}
              onClick={() => handleRowClick(question.questionId)}
            >
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium mr-3">
                    {question.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-gray-800">{question.name}</div>
                    <div className="text-sm text-gray-500">{question.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-800">{question.subject}</div>
              </td>
              <td className="px-6 py-4 text-gray-700">{formatDate(question.createdAt)}</td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium inline-block
                  ${
                    question.isAnswer
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {question.isAnswer ? "답변 완료" : "답변 대기"}
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
