"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import { useState, useRef } from "react";
import { UplaodImages, ArticleForm } from "../../types/article";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 설명 입력 시 자동 리사이징
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_DESCRIPTION_LENGTH) {
      setForm({ ...form, description: newText });
    }

    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 300) + "px";
    }
  };

  // 업로드 박스 클릭 → 곧장 갤러리 열기
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // 이미지 업로드 처리
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: UplaodImages[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 10));
  };

  // 이미지 삭제
  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="pt-14 px-4">
      <CommonTopBar title="판매하기" leftAction="close" rightAction="none" />

      {/* 이미지 업로드 input */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* 썸네일 미리보기 (카메라 버튼 위) */}
      {images.length > 0 && (
        <div className="flex overflow-x-auto gap-2 mb-2 pt-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-[70px] h-[70px] flex-shrink-0">
              <img
                src={img.previewUrl}
                alt={`upload-${idx}`}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                onClick={() => handleDeleteImage(idx)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-md"
              >
                <XMarkIcon className="w-4 h-4 text-error" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 업로드 박스 */}
      <div className="relative mb-3 mt-2">
        <div
          onClick={handleClickUpload}
          className="w-[70px] h-[70px] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm cursor-pointer"
        >
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
          type="text"
          inputMode="numeric"
          min="0"
          placeholder="₩ 가격을 입력해주세요."
          value={form.price}
          onChange={(e) => {
            // 숫자만 추출
            const rawValue = e.target.value.replace(/[^0-9]/g, "");

            // 숫자로 변환 (선택 사항)
            const numberValue = Number(rawValue);

            if (numberValue >= 0) {
              // 쉼표 추가해서 표시
              const formatted = numberValue.toLocaleString();
              setForm({ ...form, price: formatted });
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
        <div className="flex justify-between items-center text-xs mt-1">
          {form.description.length >= MAX_DESCRIPTION_LENGTH ? (
            <p className="text-error">
              설명은 최대 {MAX_DESCRIPTION_LENGTH}자 이내로 작성해주세요.
            </p>
          ) : (
            <span />
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
            const priceNumber = Number(form.price.replace(/,/g, ""));
            console.log("등록 데이터:", {
              ...form,
              price: priceNumber,
            });
            console.log("이미지 파일:", images);
          }}
        />
      </div>
    </div>
  );
};

export default ArticleWritePage;
