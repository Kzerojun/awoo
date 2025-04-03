"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { BellIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { createQuestion } from "@/api/question/question";
import { toast } from "react-toastify";

export default function Questioning() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("카테고리 선택");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 문자 수 카운트 (최대 100자)
  const contentLength = content.length;
  const maxLength = 100;

  // 카테고리 드롭다운 토글
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // 문의 제출 처리
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("문의 제목을 입력해주세요.");
      return;
    }

    if (category === "카테고리 선택") {
      toast.error("문의 유형을 선택해주세요.");
      return;
    }

    if (!content.trim()) {
      toast.error("문의 내용을 입력해주세요.");
      return;
    }

    if (isPrivate && !password.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // API 요청 객체 생성
      const requestData = {
        subject: title,
        content: content,
        category: category,
        isPublic: !isPrivate,
        password: isPrivate ? password : "",
      };

      // API 호출
      const response = await createQuestion(requestData);

      if (response.success) {
        toast.success(response.response || "문의가 성공적으로 등록되었습니다.");
        router.push("/my/question");
      } else {
        toast.error(response.error || "문의 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("문의 등록 중 오류가 발생했습니다:", error);
      toast.error("문의 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 카테고리 옵션
  const categoryOptions = [
    "카테고리 선택",
    "산책 관련",
    "적금 혜택 관련",
    "중고거래 관련",
    "서비스 관련",
    "기타",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonTopBar title="문의하기" rightAction="bell" />

      <div className="pt-15 pb-20 px-4">
        <form onSubmit={handleSubmit}>
          {/* 문의 제목 */}
          <div className="mb-3">
            <label className="block text-gray-800 text-lg font-medium mb-1">문의 제목</label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-teal-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 문의 유형 */}
          <div className="mb-6 relative">
            <label className="block text-gray-800 text-lg font-medium mb-1">문의 유형</label>
            <div
              className="w-full border-b border-gray-300 py-2 flex justify-between items-center"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span
                className={
                  category === "카테고리 선택" ? "text-gray-400 text-sm" : "text-gray-800 text-sm"
                }
              >
                {category}
              </span>
              <svg
                className={`h-5 w-5 text-gray-400 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* 드롭다운 메뉴 */}
            {showCategoryDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                {categoryOptions.map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCategory(option);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 문의 내용 */}
          <div className="mb-3">
            <label className="block text-gray-800 text-lg font-medium mb-2">문의 내용</label>
            <div className="relative">
              <textarea
                placeholder="내용을 입력하세요"
                className="w-full h-50 p-4 bg-[#E8F5F2] rounded-lg focus:outline-none resize-none"
                value={content}
                onChange={(e) => {
                  if (e.target.value.length <= maxLength) {
                    setContent(e.target.value);
                  }
                }}
              />
              <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                {contentLength}/{maxLength}
              </span>
            </div>
          </div>

          {/* 비밀글 설정 */}
          <div className="mb-4">
            <p className="block text-gray-800 text-lg font-medium mb-3">비밀글 설정</p>
            <div className="flex items-center gap-6 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="privacy"
                  checked={!isPrivate}
                  onChange={() => setIsPrivate(false)}
                  className="h-5 w-5 text-teal-500 mr-2"
                />
                <span>공개글</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="privacy"
                  checked={isPrivate}
                  onChange={() => setIsPrivate(true)}
                  className="h-5 w-5 text-teal-500 mr-2"
                />
                <span>비밀글</span>
              </label>
            </div>

            {/* 비밀글 비밀번호 입력 */}
            {isPrivate && (
              <div className="flex items-center border-b border-gray-300">
                <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="w-full py-2 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-[#E8F5F2] text-teal-500 rounded-lg font-medium"
          >
            {isSubmitting ? "제출 중..." : "문의하기"}
          </button>
        </form>
      </div>
    </div>
  );
}
