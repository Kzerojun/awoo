"use client";

import { SetStateAction, useState } from "react";
import QuestionList from "./components/QuestionList";
import QuestionDetailModal from "./components/QuestionDetailModal";
import { questionData } from "./data/mockData";

export default function Questions() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 문의 상세 조회 핸들러
  const handleViewDetail = (question: any) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  // 답변 제출 핸들러
  const handleSubmitAnswer = (questionId: any, answer: any) => {
    // 실제로는 API 호출을 통해 답변을 저장하는 로직이 필요
    console.log(`문의 ID: ${questionId}, 답변 내용: ${answer}`);
    handleCloseModal();
    // 답변 후 목록 새로고침 로직이 필요
  };

  return (
    <div className="container mx-auto p-4">
      {/* 문의 목록 컴포넌트 */}
      <QuestionList questions={questionData} onViewDetail={handleViewDetail} />

      {/* 문의 상세 모달 */}
      {isModalOpen && selectedQuestion && (
        <QuestionDetailModal
          question={selectedQuestion}
          onClose={handleCloseModal}
          onSubmit={handleSubmitAnswer}
        />
      )}
    </div>
  );
}
