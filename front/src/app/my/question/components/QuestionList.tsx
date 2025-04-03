"use client";

import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import { QuestionItemType } from "../types";
import { getQuestionList } from "@/api/question/question";
import { toast } from "react-toastify";

interface QuestionListProps {
  filter?: (question: QuestionItemType) => boolean;
}

const QuestionList: React.FC<QuestionListProps> = ({ filter }) => {
  const [questions, setQuestions] = useState<QuestionItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await getQuestionList();

        if (response.success && response.response) {
          // 명시적으로 타입 단언(type assertion)
          const questionData = response.response as unknown as {
            questionId: number;
            subject: string;
            name: string;
            isPublic: boolean;
            isAnswer: boolean;
          }[];

          // 타입 단언 후 변환
          const formattedQuestions: QuestionItemType[] = questionData.map((question) => ({
            id: question.questionId,
            title: question.subject,
            author: question.name || "사용자",
            date: new Date()
              .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\. /g, "."),
            isLocked: !question.isPublic,
            hasAnswer: question.isAnswer,
          }));

          // 필터가 제공된 경우 필터링
          if (filter) {
            setQuestions(formattedQuestions.filter(filter));
          } else {
            setQuestions(formattedQuestions);
          }
        } else {
          toast.error("문의 목록을 불러오는데 실패했습니다.");
          setQuestions([]);
        }
      } catch (error) {
        console.error("문의 목록 조회 오류:", error);
        toast.error("문의 목록을 불러오는데 실패했습니다.");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [filter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">문의 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mb-1">
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
