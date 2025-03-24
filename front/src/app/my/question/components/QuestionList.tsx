"use client";

import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import { QuestionItemType } from "../data/questionData";

interface QuestionListProps {
  initialQuestions?: QuestionItemType[];
  filter?: (question: QuestionItemType) => boolean;
}

const QuestionList: React.FC<QuestionListProps> = ({ initialQuestions, filter }) => {
  const [questions, setQuestions] = useState<QuestionItemType[]>(initialQuestions || []);

  useEffect(() => {
    if (initialQuestions) {
      // 필터가 제공된 경우 필터링된 질문 목록 사용
      if (filter) {
        setQuestions(initialQuestions.filter(filter));
      } else {
        setQuestions(initialQuestions);
      }
    }
  }, [initialQuestions, filter]);

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
