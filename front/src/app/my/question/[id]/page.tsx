"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { getQuestionDetail } from "@/api/question/question";

// 문의 상세 데이터 타입
interface QuestionDetailType {
  id: number;
  title: string;
  author: string;
  date: string;
  isLocked: boolean;
  hasAnswer: boolean;
  content: string;
  answer?: string;
}

export default function QuestionDetail() {
  const params = useParams();
  const router = useRouter();
  const questionId = params.id ? parseInt(params.id as string) : 0;
  const [question, setQuestion] = useState<QuestionDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  // 문의 데이터 로드
  const fetchQuestionDetail = async (pwd: string = "") => {
    try {
      setLoading(true);
      const response = await getQuestionDetail({
        questionId: questionId,
        password: pwd,
      });

      if (response.success) {
        const data = response.response;
        // 데이터 형식 변환
        setQuestion({
          id: questionId, // API 응답에 ID가 없어 URL 파라미터 사용
          title: data.subject,
          author: data.name || "사용자",
          date: new Date()
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\. /g, "."),
          isLocked: false, // 정보가 없으므로 기본값 사용
          hasAnswer: !!data.answer,
          content: data.content,
          answer: data.answer,
        });

        setShowPasswordModal(false);
      } else {
        // 비밀번호가 잘못된 경우 또는 다른 오류
        if (pwd) {
          setPasswordError(true);
        } else {
          alert("문의를 불러오는데 실패했습니다.");
          router.back();
        }
      }
    } catch (error) {
      console.error("문의 상세 조회 오류:", error);
      alert("문의를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect에서는 위에서 정의한 함수를 호출
  useEffect(() => {
    fetchQuestionDetail();
  }, [questionId]); // 의존성 배열에서 router 제거, fetchQuestionDetail은 컴포넌트 함수 내부에 있으므로 포함 안 함

  // 비밀글 비밀번호 제출
  const handlePasswordSubmit = () => {
    if (!password.trim()) {
      setPasswordError(true);
      return;
    }

    fetchQuestionDetail(password);
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <CommonTopBar title="1:1 문의" />
        <div className="pt-14 flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  // 비밀번호 입력 모달
  if (showPasswordModal) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <CommonTopBar title="1:1 문의" />
        <div className="pt-14 flex flex-col items-center justify-center h-screen p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">비밀글 확인</h2>
            <p className="text-sm text-gray-600 mb-4 text-center">
              이 글은 비밀글입니다. 비밀번호를 입력해주세요.
            </p>

            <div className="mb-4">
              <input
                type="password"
                className={`w-full p-2 border ${passwordError ? "border-red-500" : "border-gray-300"} rounded`}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
              >
                취소
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 bg-teal-500 text-white rounded"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <CommonTopBar title="1:1 문의" />
        <div className="pt-14 flex justify-center items-center h-screen">
          <p>문의를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonTopBar title="1:1 문의" />

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
