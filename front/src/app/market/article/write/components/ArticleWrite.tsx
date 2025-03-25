"use client";

import CommonTopBar from "@/common/ui/CommonTopBar"; // 공통 상단바 컴포넌트
import { useState, useRef } from "react";
import { UploadImages, ArticleForm } from "../../../types/article"; // 타입 정의 import
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid"; // 아이콘 import
import Button from "@/common/ui/Button"; // 공통 버튼 컴포넌트

// 컴포넌트 Props 정의
interface ArticleWritePageProps {
  initialData?: ArticleForm; // 수정 시 초기 데이터
  isEdit?: boolean; // 수정 모드 여부
}

// 판매글 작성/수정 페이지 컴포넌트
const ArticleWritePage = ({ initialData, isEdit = false }: ArticleWritePageProps) => {
  // 이미지 리스트 상태
  const [images, setImages] = useState<UploadImages[]>([]);
  // 폼 데이터 상태 (제목, 가격, 설명)
  const [form, setForm] = useState<ArticleForm>(
    initialData || {
      title: "",
      price: "",
      description: "",
    }
  );

  const MAX_DESCRIPTION_LENGTH = 500; // 설명 최대 길이
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
      el.style.height = Math.min(el.scrollHeight, 300) + "px"; // 최대 300px까지만 확장
    }
  };

  // 업로드 영역 클릭 시 파일 input 강제 클릭
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // 이미지 업로드 처리
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // 미리보기 URL 생성 및 이미지 추가 (최대 10장)
    const newImages: UploadImages[] = Array.from(files).map((file) => ({
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
      {/* 상단바 (수정모드에 따라 타이틀 변경) */}
      <CommonTopBar
        title={isEdit ? "수정하기" : "판매하기"}
        leftAction="close"
        rightAction="none"
      />

      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* 이미지 미리보기 썸네일 리스트 */}
      {images.length > 0 && (
        <div className="flex overflow-x-auto gap-2 mb-2 pt-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-[70px] h-[70px] flex-shrink-0">
              <img
                src={img.previewUrl}
                alt={`upload-${idx}`}
                className="w-full h-full object-cover rounded-md"
              />

              {/* 삭제 버튼 */}
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

      {/* 이미지 업로드 박스 (카메라 아이콘 + 이미지 개수 표시) */}
      <div className="relative mb-3 mt-2">
        <div
          onClick={handleClickUpload}
          className="w-[70px] h-[70px] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm cursor-pointer"
        >
          <CameraIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">{images.length}/10</span>
        </div>
      </div>

      {/* 제목 입력란 */}
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

      {/* 가격 입력란 */}
      <div className="mb-4">
        <label className="text-xs font-medium text-custom-black mb-1 block">가격</label>
        <input
          type="text"
          inputMode="numeric"
          min="0"
          placeholder="₩ 가격을 입력해주세요."
          value={form.price}
          onChange={(e) => {
            // 숫자 외 문자 제거
            const rawValue = e.target.value.replace(/[^0-9]/g, "");

            // 양수일 경우만 처리 + 쉼표 추가
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

      {/* 설명 입력란 */}
      <div className="mb-6">
        <label className="text-xs font-medium text-custom-black mb-1 block">설명</label>
        <textarea
          ref={textareaRef}
          value={form.description}
          onChange={handleDescriptionChange}
          placeholder={`상품에 대한 자세한 설명을 추가해주세요.\n유해한 내용, 적절치 못한 내용을 포함할 경우 게시글 작성 및 사이트 이용에 제재를 받을 수 있습니다.`}
          className="w-full border border-gray-300 rounded-md px-3 py-3 text-base min-h-[128px] max-h-[300px] overflow-hidden placeholder:text-sm placeholder:text-gray-400 hover:border-aqua focus:border-aqua focus:outline-none transition resize-none"
        />
        {/* 설명 길이 제한 안내 + 카운터 */}
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

      {/* 등록 또는 수정 버튼 */}
      <div className="flex justify-center">
        <Button
          text={isEdit ? "수정 완료" : "등록하기"}
          fontBold="base"
          width="long"
          backgroundColor="aqua"
          fontColor="custom-white"
          className="w-full"
          onClick={() => {
            // 가격 문자열에서 쉼표 제거 후 숫자로 변환
            const priceNumber = Number(form.price.replace(/,/g, ""));
            // 콘솔로 확인 (향후 API 요청으로 대체 예정)
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
