"use client";

import { useEffect, useState } from "react";
import QuestionList from "./components/QuestionList";
import QuestionDetailModal from "./components/QuestionDetailModal";
import { getQuestionList, getQuestionDetail, answerQuestion } from "@/api/admin/admin";

// API 응답 타입 정의
interface QuestionListItem {
  questionId: number;
  name: string;
  email: string;
  subject: string;
  createdAt: string;
  isAnswer: boolean;
}

interface QuestionDetail {
  subject: string;
  name: string;
  content: string;
  answer: string;
}

export default function Questions() {
  const [questions, setQuestions] = useState<QuestionListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [questionDetail, setQuestionDetail] = useState<QuestionDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 문의사항 목록 불러오기
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await getQuestionList();
      if (response.success) {
        setQuestions(response.response);
      } else {
        console.error("문의사항 목록 불러오기 실패:", response.error);
      }
    } catch (error) {
      console.error("문의사항 목록 요청 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 문의사항 상세 정보 불러오기
  const fetchQuestionDetail = async (questionId: number) => {
    try {
      const response = await getQuestionDetail(questionId);
      if (response.success) {
        setQuestionDetail(response.response);
        setIsModalOpen(true);
      } else {
        console.error("문의사항 상세 불러오기 실패:", response.error);
      }
    } catch (error) {
      console.error("문의사항 상세 요청 오류:", error);
    }
  };

  // 페이지 로드시 문의사항 목록 불러오기
  useEffect(() => {
    fetchQuestions();
  }, []);

  // 문의 상세 조회 핸들러
  const handleViewDetail = (questionId: number) => {
    setSelectedQuestionId(questionId);
    fetchQuestionDetail(questionId);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuestionDetail(null);
    setSelectedQuestionId(null);
  };

  // 답변 제출 핸들러
  const handleSubmitAnswer = async (questionId: number, answer: string) => {
    try {
      const response = await answerQuestion({ questionId, answer });
      if (response.success) {
        // 성공 시 목록 새로고침
        fetchQuestions();
        handleCloseModal();
      } else {
        console.error("답변 등록 실패:", response.error);
        alert("답변 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("답변 등록 요청 오류:", error);
      alert("답변 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto">
      {/* 로딩 표시 */}
      {loading ? (
        <div className="text-center p-8">
          <p className="text-gray-500">문의사항을 불러오는 중입니다...</p>
        </div>
      ) : (
        <>
          {/* 문의 목록 컴포넌트 */}
          <QuestionList questions={questions} onViewDetail={handleViewDetail} />

          {/* 문의 상세 모달 */}
          {isModalOpen && questionDetail && selectedQuestionId && (
            <QuestionDetailModal
              questionId={selectedQuestionId}
              question={questionDetail}
              onClose={handleCloseModal}
              onSubmit={handleSubmitAnswer}
            />
          )}
        </>
      )}
    </div>
  );
}
