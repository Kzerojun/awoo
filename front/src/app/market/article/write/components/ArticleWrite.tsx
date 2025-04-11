"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import { useState, useRef } from "react";
import { UploadImages, ArticleForm } from "../../../types/article";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Button from "@/common/ui/Button";
import { postUsedProduct } from "@/api/market/create/article";
import { putUsedProduct } from "@/api/market/update/article";
import { useRouter } from "next/navigation";

// 컴포넌트 Props 정의
interface ArticleWritePageProps {
  initialData?: ArticleForm & { id?: string; imageUrls?: string[] };
  isEdit?: boolean;
}

const ArticleWritePage = ({ initialData, isEdit = false }: ArticleWritePageProps) => {
  console.log("🛠️ ArticleWritePage initialData:", initialData); // 💬 props로 넘긴 값 확인
  const router = useRouter();
  const [images, setImages] = useState<UploadImages[]>([]);
  const [remainImageUrls, setRemainImageUrls] = useState<string[]>(initialData?.imageUrls || []);

  const [form, setForm] = useState<ArticleForm>(
    initialData || {
      title: "",
      price: "",
      description: "",
    }
  );

  const MAX_DESCRIPTION_LENGTH = 500;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: UploadImages[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 10));
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleDeleteRemainImage = (index: number) => {
    setRemainImageUrls((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async () => {
    try {
      const priceNumber = Number(form.price.replace(/,/g, ""));

      if (!form.title || !form.description || priceNumber <= 0) {
        alert("모든 값을 올바르게 입력해주세요.");
        return;
      }

      const formData = new FormData();

      const jsonPayload = {
        title: form.title,
        content: form.description,
        price: priceNumber,
        remainImageUrls: remainImageUrls,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(jsonPayload)], {
          type: "application/json",
        })
      );

      images.forEach((img) => {
        formData.append("images", img.file);
      });
      // ✅ 여기서 FormData 확인!
      for (const pair of formData.entries()) {
        console.log("🧾 FormData:", pair[0], pair[1]);
      }
      if (isEdit) {
        if (!initialData?.id) {
          alert("게시글 ID가 존재하지 않습니다.");
          return;
        }

        await putUsedProduct(initialData.id, formData);
        alert("수정이 완료되었습니다.");
      } else {
        await postUsedProduct(formData);
        alert("등록이 완료되었습니다.");
      }

      router.push("/market");
    } catch (error) {
      console.error("등록/수정 실패", error);
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="pt-14 px-4">
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

      {/* 기존 이미지 (수정모드일 때) */}
      {remainImageUrls.length > 0 && (
        <div className="flex overflow-x-auto gap-2 mb-2 pt-2">
          {remainImageUrls.map((url, idx) => (
            <div key={idx} className="relative w-[70px] h-[70px] flex-shrink-0">
              <img
                src={url}
                alt={`origin-${idx}`}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                onClick={() => handleDeleteRemainImage(idx)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-md"
              >
                <XMarkIcon className="w-4 h-4 text-error" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 새로 추가된 이미지 */}
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

      <div className="relative mb-3 mt-2">
        <div
          onClick={handleClickUpload}
          className="w-[70px] h-[70px] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm cursor-pointer"
        >
          <CameraIcon className="w-6 h-6 mb-1" />
          <span className="text-xs">{images.length + remainImageUrls.length}/10</span>
        </div>
      </div>

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

      <div className="mb-4">
        <label className="text-xs font-medium text-custom-black mb-1 block">가격</label>
        <input
          type="text"
          inputMode="numeric"
          min="0"
          placeholder="₩ 가격을 입력해주세요."
          value={form.price}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^0-9]/g, "");
            const numberValue = Number(rawValue);
            if (numberValue >= 0) {
              const formatted = numberValue.toLocaleString();
              setForm({ ...form, price: formatted });
            }
          }}
          className="w-full border border-gray-300 rounded-md px-3 py-3 text-base placeholder:text-sm placeholder:text-gray-400 hover:border-aqua focus:border-aqua focus:outline-none transition"
        />
      </div>

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

      <div className="flex justify-center">
        <Button
          text={isEdit ? "수정 완료" : "등록하기"}
          fontBold="base"
          width="long"
          backgroundColor="aqua"
          fontColor="custom-white"
          className="w-full"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ArticleWritePage;
