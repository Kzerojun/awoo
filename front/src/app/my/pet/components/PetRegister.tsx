"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import Button from "@/common/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import RegisterInfo from "./RegisterInfo";
import { useRegisterPet } from "@/hooks/pet/useRegisterPet";
import { addPet } from "@/lib/slices/petSlice";
import { useRouter } from "next/navigation";

const defaultPetAvatars = [
  "/images/pet-avatars/petava_basic.png",
  "/images/pet-avatars/petava1.png",
  "/images/pet-avatars/petava2.png",
  "/images/pet-avatars/petava3.png",
  "/images/pet-avatars/petava4.png",
];

const PetRegister = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedPetAvatar, setSelectedPetAvatar] = useState<string>(defaultPetAvatars[0]);
  const [showPetAvatarModal, setShowPetAvatarModal] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 반려견 등록 쿼리
  const {
    mutate: registerPetMutate,
    isPending: registerPetPending,
    isSuccess: registerPetSuccess,
    isError: registerPetError,
  } = useRegisterPet();

  // 반려견 이름
  const [petName, setPetName] = useState<string>("");
  const [petAgeString, setPetAgeString] = useState<string>("");
  const [breed, setBreed] = useState<string>("");

  // OCR 인증 여부
  const [checkOcr, setCheckOcr] = useState<boolean>(false);
  // OCR 이미지
  const [ocrImageUrl, setOcrImageUrl] = useState<string>("");
  // 동물 등록 번호
  const [animalRegNumber, setAnimalRegNumber] = useState<string>("");

  // 사용자 앨범에서 선택할 때
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setSelectedPetAvatar("");
  };

  // 기본 이미지 선택 핸들러
  const handleSelectedPetAvatar = (url: string) => {
    setImagePreview(url);
    setImageFile(null);
    setSelectedPetAvatar(url);
    setShowPetAvatarModal(false);
  };

  // 반려견 등록
  const handleRegisterPet = () => {
    if (
      petName === "" ||
      petAgeString === "" ||
      breed === "" ||
      (imageFile === null && selectedPetAvatar === "") ||
      (checkOcr && animalRegNumber === "" && ocrImageUrl === "")
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    const petAge = Number(petAgeString);
    const requestDto = {
      name: petName,
      breed: breed,
      age: petAge,
      animalRegNumber: animalRegNumber,
      ocrImageUrl: ocrImageUrl,
    };

    registerPetMutate(
      { requestDto, imageFile, selectedPetAvatar },
      {
        onSuccess: (data) => {
          dispatch(addPet(data));
          console.log(data);
          alert("반려견을 성공적으로 등록했습니다.");
          router.replace("/my/pet");
        },
        onError: (err) => {
          alert("반려견 등록에 실패했습니다.");
          console.error("반려견 등록 실패:", err);
          return;
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 px-4">
      <h1 className="text-2xl font-semibold text-center mt-6 text-gray-800">반려견 등록</h1>

      {/* 이미지 업로드 or 기본 선택 */}
      <div className="w-40 h-40 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="반려견 미리보기"
            width={160}
            height={160}
            className="object-cover"
          />
        ) : (
          <button className="text-sm text-gray-400" onClick={() => imageInputRef.current?.click()}>
            이미지 업로드
          </button>
        )}
      </div>

      {/* 이미지 선택 버튼 */}
      <div className="flex justify-center gap-4 mt-1">
        <Button
          onClick={() => imageInputRef.current?.click()}
          text="앨범 선택"
          backgroundColor="white"
          border="aqua"
          fontColor="aqua"
          width="short"
        />
        <Button
          onClick={() => setShowPetAvatarModal(true)}
          text="기본 이미지"
          backgroundColor="white"
          fontColor="aqua"
          border="aqua"
          width="short"
        />
      </div>

      {/* 숨겨진 파일 input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={imageInputRef}
        onChange={handleImageChange}
      />

      {/* 반려견 정보 입력 */}
      <RegisterInfo
        petName={petName}
        setPetName={setPetName}
        petAge={petAgeString}
        setPetAge={setPetAgeString}
        breed={breed}
        setBreed={setBreed}
        checkOcr={checkOcr}
        setCheckOcr={setCheckOcr}
        ocrImageUrl={ocrImageUrl}
        setOcrImageUrl={setOcrImageUrl}
        animalRegNumber={animalRegNumber}
        setAnimalRegNumber={setAnimalRegNumber}
      />

      {/* 기본 이미지 선택 모달 */}
      <AnimatePresence>
        {showPetAvatarModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPetAvatarModal(false)}
          >
            <motion.div
              className="w-full bg-white rounded-t-2xl p-4 pb-8"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-center text-lg font-semibold text-gray-800 mb-6">
                기본 이미지 선택
              </h2>
              <div className="grid grid-cols-3 gap-3 px-4">
                {defaultPetAvatars.map((url) => (
                  <div
                    key={url}
                    className={`mx-auto w-20 h-20 rounded-full overflow-hidden border-4 ${
                      selectedPetAvatar === url
                        ? "border-aqua ring-2 ring-aqua"
                        : "border-transparent"
                    } cursor-pointer`}
                    onClick={() => handleSelectedPetAvatar(url)}
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

      {/* 등록 버튼 */}
      <Button
        text={registerPetPending ? "등록 중..." : "반려견 등록"}
        backgroundColor="green"
        width="medium"
        onClick={handleRegisterPet}
        className="mt-6"
      />
    </div>
  );
};

export default PetRegister;
