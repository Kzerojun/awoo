"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import { useState, useRef } from "react";
import { UplaodImages, ArticleForm } from "../../types/article";
import { CameraIcon } from "@heroicons/react/24/solid";
import Button from "@/common/ui/Button";

const ArticleWritePage = () => {
  const [images, setImages] = useState<UplaodImages[]>([]);
  const [form, setForm] = useState<ArticleForm>({
    title: "",
    price: "",
    description: "",
  });

  const MAX_DESCRIPTION_LENGTH = 500;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    if (newText.length <= MAX_DESCRIPTION_LENGTH) {
      setForm({ ...form, description: newText });
    }

    // auto resize
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // 초기화
      el.style.height = Math.min(el.scrollHeight, 300) + "px"; // 최대 300px 제한
    }
  };

  return (
    <div className="pt-14 px-4">
      <CommonTopBar title="판매하기" leftAction="close" rightAction="none" />

      {/* 이미지 업로드 박스 */}
      <div className="mb-6 mt-4">
        <div className="w-[70px] h-[70px] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm">
          <CameraIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">{images.length}/10</span>
        </div>
      </div>

      {/* 제목 */}
      <div className="mb-4">
        <label className="text-xs font-medium text-custom-black mb-1 block">제목</label>
        <input
          type="text"
          placeholder="글 제목"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-3 py-3 text-base placeholder:text-sm placeholder:text-gray-400 hover:border-aqua focus:border-aqua focus:outline-none transition"
        />
      </div>

      {/* 가격 */}
      <div className="mb-4">
        <label className="text-xs font-medium text-custom-black mb-1 block">가격</label>
        <input
          type="number"
          min="0"
          placeholder="₩ 가격을 입력해주세요."
          value={form.price}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0) {
              setForm({ ...form, price: e.target.value });
            }
          }}
          className="w-full border border-gray-300 rounded-md px-3 py-3 text-base placeholder:text-sm placeholder:text-gray-400 hover:border-aqua focus:border-aqua focus:outline-none transition"
        />
      </div>

      {/* 설명 */}
      <div className="mb-6">
        <label className="text-xs font-medium text-custom-black mb-1 block">설명</label>
        <textarea
          ref={textareaRef}
          value={form.description}
          onChange={handleDescriptionChange}
          placeholder={`상품에 대한 자세한 설명을 추가해주세요.\n유해한 내용, 적절치 못한 내용을 포함할 경우 게시글 작성 및 사이트 이용에 제재를 받을 수 있습니다.`}
          className="w-full border border-gray-300 rounded-md px-3 py-3 text-base min-h-[128px] max-h-[300px] overflow-hidden placeholder:text-sm placeholder:text-gray-400 hover:border-aqua focus:border-aqua focus:outline-none transition resize-none"
        />

        {/* 경고 + 글자수 */}
        <div className="flex justify-between items-center text-xs mt-1">
          {form.description.length >= MAX_DESCRIPTION_LENGTH ? (
            <p className="text-error">
              설명은 최대 {MAX_DESCRIPTION_LENGTH}자 이내로 작성해주세요.
            </p>
          ) : (
            <span /> // 공간 유지용 빈 span
          )}
          <span
            className={
              form.description.length >= MAX_DESCRIPTION_LENGTH ? "text-error" : "text-gray-400"
            }
          >
            {form.description.length} / {MAX_DESCRIPTION_LENGTH}
          </span>
        </div>
      </div>

      {/* 등록하기 버튼 */}
      <div className="flex justify-center">
        <Button
          text="등록하기"
          fontBold="base"
          width="long"
          backgroundColor="aqua"
          fontColor="custom-white"
          className="w-full"
          onClick={() => {
            console.log("등록 데이터:", form);
          }}
        />
      </div>
    </div>
  );
};

export default ArticleWritePage;
