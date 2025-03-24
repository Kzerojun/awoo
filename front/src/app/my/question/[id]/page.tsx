"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TopBar from "@/common/ui/TopBar";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { QuestionItemType } from "../data/questionData";

// 상세 문의 데이터 타입 (기본 문의 데이터 + 상세 내용)
interface QuestionDetailType extends QuestionItemType {
  content: string;
  answer?: string;
}

export default function QuestionDetail() {
  const params = useParams();
  const router = useRouter();
  const questionId = params.id;
  const [question, setQuestion] = useState<QuestionDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 문의 데이터 로드 (실제로는 API 호출)
  useEffect(() => {
    // 문의 상세 데이터를 가져오는 API 호출을 시뮬레이션
    // 실제 구현 시에는 API 호출로 대체
    const mockQuestionData: { [key: string]: QuestionDetailType } = {
      "1": {
        id: 1,
        title: "측정 거리 오차 문의 드립니다.",
        author: "김홍범(rlag**)",
        date: "2025.03.12",
        isLocked: true,
        hasAnswer: false,
        content:
          "산책하는 동안 거리 측정에 오차가 너무 크게 발생합니다. 같은 코스를 걷는데도 매번 측정 거리가 다르게 나타납니다. 이 문제를 해결할 수 있을까요?",
      },
      "2": {
        id: 2,
        title: "가족 적금 가입 문의 드립니다.",
        author: "이다은(dlek**)",
        date: "2025.02.12",
        isLocked: true,
        hasAnswer: false,
        content:
          "가족 적금 상품에 가입하려고 합니다. 가족 구성원은 총 3명인데, 모두 함께 가입해야 하나요? 각자 계정으로 가입이 가능한지 알고 싶습니다.",
      },
      "3": {
        id: 3,
        title: "탈퇴 시 데이터 처리 문의 드립니다.",
        author: "김홍범(rlag**)",
        date: "2025.01.12",
        isLocked: false,
        hasAnswer: true,
        content:
          "서비스 탈퇴 시 그동안 기록된 산책 데이터와 저장된 개인정보는 어떻게 처리되나요? 모든 데이터가 즉시 삭제되는지 알고 싶습니다.",
        answer:
          "안녕하세요, 고객님. 서비스 탈퇴 시 개인정보는 즉시 삭제됩니다. 다만 법적 보존 의무가 있는 일부 데이터(거래 기록 등)는 법정 기간 동안 보관 후 파기됩니다. 자세한 내용은 개인정보처리방침을 참고해 주세요.",
      },
      "4": {
        id: 4,
        title: "산책 거리 미기록 문의 드립니다.",
        author: "강은수(rkdd**)",
        date: "2024.12.12",
        isLocked: true,
        hasAnswer: true,
        content:
          "어제 산책을 했는데 앱에서 기록이 되지 않았습니다. GPS는 켜져 있었고, 1시간 정도 산책했는데 전혀 기록되지 않았어요. 혹시 복구 가능한가요?",
        answer:
          "안녕하세요, 고객님. 불편을 드려 죄송합니다. GPS 신호가 약한 지역이나 배터리 최적화 설정이 활성화된 경우 기록이 누락될 수 있습니다. 안타깝게도 누락된 산책 기록은 복구가 어렵습니다. 향후 산책 시 앱이 백그라운드에서도 실행될 수 있도록 배터리 최적화 설정을 확인해 주세요.",
      },
    };

    setTimeout(() => {
      if (mockQuestionData[questionId as string]) {
        setQuestion(mockQuestionData[questionId as string]);
      }
      setLoading(false);
    }, 500); // 실제 API 호출 시뮬레이션을 위한 지연
  }, [questionId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <TopBar title="1:1 문의" />
        <div className="pt-14 flex justify-center items-center h-screen">
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <TopBar title="1:1 문의" />
        <div className="pt-14 flex justify-center items-center h-screen">
          <p>문의를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar title="1:1 문의" />

      <div className="pt-14 pb-20 px-4">
        {/* 문의 제목 */}
        <div className="py-4 border-b border-gray-200">
          <div className="flex items-center">
            <h1 className="text-lg font-medium text-gray-800">{question.title}</h1>
            {question.isLocked && <LockClosedIcon className="h-5 w-5 text-gray-500 ml-2" />}
          </div>
          <div className="flex text-xs text-gray-500 mt-2">
            <span>작성자: {question.author}</span>
            <span className="mx-2">|</span>
            <span>작성일: {question.date}</span>
          </div>
        </div>

        {/* 문의 내용 */}
        <div className="py-6 border-b border-gray-200">
          <p className="text-gray-700 whitespace-pre-line">{question.content}</p>
        </div>

        {/* 답변 영역 */}
        {question.hasAnswer && question.answer && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-medium text-teal-600 mb-2">답변</h2>
            <p className="text-gray-700 whitespace-pre-line">{question.answer}</p>
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 rounded-md text-gray-700 mr-2"
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}
