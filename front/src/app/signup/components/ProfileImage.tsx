"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import Button from "@/common/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/store";

const defaultAvatars = [
  "/images/avatars/basic.jpg",
  "/images/avatars/man1.png",
  "/images/avatars/man2.png",
  "/images/avatars/woman1.png",
  "/images/avatars/woman2.png",
];

interface ProfileImageProps {
  imagePreview: string | null;
  setImagePreview: (v: string) => void;
  imageFile: File | null;
  setImageFile: (v: File | null) => void;
  selectedAvatar: string | null;
  setSelectedAvatar: (v: string) => void;
}

const ProfileImage = ({
  imagePreview,
  setImagePreview,
  imageFile,
  setImageFile,
  selectedAvatar,
  setSelectedAvatar,
}: ProfileImageProps) => {
  const dispatch = useAppDispatch();

  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  // const [selectedAvatar, setSelectedAvatar] = useState<string>(defaultAvatars[0]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 이미지 바꾸는 핸들러
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file));
    // 기본 이미지 선택 해제
    setSelectedAvatar("");
  };

  // 기본 이미지 선택 핸들러
  const handleSelectAvatar = (url: string) => {
    setImagePreview(url);
    setImageFile(null); // 파일 선택 해제
    setSelectedAvatar(url);
    setShowAvatarModal(false);
  };

  return (
    <div className="h-full relative flex flex-col justify-center items-center gap-y-5">
      <h1 className="absolute top-6 left-0 w-full text-center text-xl z-10">프로필 등록 (1/2)</h1>
      <div className="flex flex-col justify-center items-center mt-5 gap-y-5">
        <div className="text-lg">프로필 이미지를 선택하세요!</div>

        {/* 이미지 선택했을 때 미리보기 */}
        {imagePreview ? (
          <div className="flex flex-col items-center justify-center gap-y-10">
            <div className="w-48 h-48 rounded-full bg-custom-gray overflow-hidden">
              <Image src={imagePreview} alt="프로필 이미지 미리보기" width={192} height={192} />
            </div>
            <div className="flex flex-col items-center justify-center gap-y-5">
              <Button
                onClick={() => inputRef.current?.click()}
                text="다시 선택하기"
                backgroundColor="custom-white"
                border="aqua"
                fontColor="aqua"
                width="medium"
              />

              <Button
                onClick={() => setShowAvatarModal(true)}
                text="기본 이미지 선택"
                backgroundColor="white"
                fontColor="aqua"
                border="aqua"
                width="medium"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-10">
            <div className="w-48 h-48 rounded-full bg-custom-gray overflow-hidden">
              <button
                className="w-full h-full flex items-center justify-center text-sm text-gray-500 cursor-pointer"
                onClick={() => inputRef.current?.click()}
              >
                이미지 선택
              </button>
            </div>
            <Button
              onClick={() => setShowAvatarModal(true)}
              text="기본 이미지 선택"
              backgroundColor="white"
              fontColor="aqua"
              border="aqua"
              width="medium"
            />
          </div>
        )}

        {/* 기본 이미지 선택 */}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleImageChange}
        />

        {/* 기본 이미지 선택 모달 */}
        <AnimatePresence>
          {showAvatarModal && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 flex items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAvatarModal(false)}
            >
              <motion.div
                className="w-full  bg-custom-white rounded-t-2xl p-4 pb-8"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-center text-lg mb-8 justify-items-center justify-center">
                  기본 이미지 선택
                </h2>
                <div className="grid grid-cols-3 gap-3 px-4 ">
                  {defaultAvatars.map((url) => (
                    <div
                      key={url}
                      className={`mx-auto w-20 h-20 rounded-full overflow-hidden border-4 ${selectedAvatar === url ? "border-aqua" : "border-transparent"} cursor-pointer`}
                      onClick={() => handleSelectAvatar(url)}
                    >
                      <Image
                        src={url}
                        alt="기본 이미지"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileImage;
