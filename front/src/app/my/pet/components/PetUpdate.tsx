"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import Button from "@/common/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import RegisterInfo from "./RegisterInfo";
import { addPet } from "@/lib/slices/petSlice";
import { useRouter } from "next/navigation";
import { usePetDetail } from "@/hooks/pet/usePetDetail";
import { useUpdatePetDetail } from "@/hooks/pet/useUpdatePetDetail";

const defaultPetAvatars = [
  "/images/pet-avatars/petava_basic.png",
  "/images/pet-avatars/petava1.png",
  "/images/pet-avatars/petava2.png",
  "/images/pet-avatars/petava3.png",
  "/images/pet-avatars/petava4.png",
];

const PetUpdate = ({ petId }: { petId: number }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedPetAvatar, setSelectedPetAvatar] = useState<string>(defaultPetAvatars[0]);
  const [showPetAvatarModal, setShowPetAvatarModal] = useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: petDetail, isLoading, isError } = usePetDetail(petId);

  // 반려견 수정 쿼리
  const {
    mutate: updatePetMutate,
    isPending: updatePetPending,
    isSuccess: updatePetSuccess,
    isError: updatePetError,
  } = useUpdatePetDetail();

  // 반려견 이름
  const [petName, setPetName] = useState<string>("");
  const [petAgeString, setPetAgeString] = useState<string>("");
  const [breed, setBreed] = useState<string>("");

  // 반려견 초기 정보
  useEffect(() => {
    if (petDetail) {
      setPetName(petDetail.name);
      setPetAgeString(petDetail.age.toString());
      setBreed(petDetail.breed);
    }
  }, [petDetail]);

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
  const handleUpdatePet = () => {
    if (
      petName === "" ||
      petAgeString === "" ||
      breed === "" ||
      (imageFile === null && selectedPetAvatar === "")
    ) {
      alert("올바른 정보를 입력해주세요.");
      return;
    }
    const petAge = Number(petAgeString);
    const requestDto = {
      name: petName,
      breed: breed,
      age: petAge,
    };

    updatePetMutate(
      { petId, requestDto, imageFile, selectedPetAvatar },
      {
        onSuccess: (data) => {
          if (!data) {
            console.error("반려견 데이터가 없습니다.");
            alert("반려견 정보를 다시 입력해주세요.");
            router.push("/my/pet");
            return;
          }

          dispatch(addPet(data));
          console.log(data);
          alert("성공적으로 수정했습니다.");
          router.replace("/my/pet");
        },
        onError: (err) => {
          alert("반려견 수정에 실패했습니다.");
          console.error("반려견 수정 실패:", err);
          return;
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-5">
      <h1 className="text-xl mt-5">반려견 등록</h1>
      {imagePreview ? (
        <div className="flex flex-col items-center justify-center gap-y-10">
          <div className="w-40 h-40 rounded-full bg-custom-gray overflow-hidden">
            <Image src={imagePreview} alt="반려견 이미지 미리보기" width={192} height={192} />
          </div>
          <div className="flex flex-col items-center justify-center gap-y-5">
            <div className="flex items-center justify-center gap-x-5">
              <Button
                onClick={() => imageInputRef.current?.click()}
                text="다시 선택"
                backgroundColor="custom-white"
                border="aqua"
                fontColor="aqua"
                width="short"
              />

              <Button
                onClick={() => setShowPetAvatarModal(true)}
                text="기본 선택"
                backgroundColor="white"
                fontColor="aqua"
                border="aqua"
                width="short"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-10">
          <div className="w-40 h-40 rounded-full bg-custom-gray overflow-hidden">
            <button
              className="w-full h-full flex items-center justify-center text-sm text-gray-500 cursor-pointer"
              onClick={() => imageInputRef.current?.click()}
            >
              이미지 선택
            </button>
          </div>
          <Button
            onClick={() => setShowPetAvatarModal(true)}
            text="기본 이미지"
            backgroundColor="white"
            fontColor="aqua"
            border="aqua"
            width="short"
          />
        </div>
      )}

      {/* 기본 이미지 선택 */}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={imageInputRef}
        onChange={handleImageChange}
      />

      {/* 반려견 정보 받는 부분 */}
      <RegisterInfo
        petName={petName}
        setPetName={setPetName}
        petAge={petAgeString}
        setPetAge={setPetAgeString}
        breed={breed}
        setBreed={setBreed}
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
              className="w-full  bg-custom-white rounded-t-2xl p-4 pb-8 mb-13.5"
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
                {defaultPetAvatars.map((url) => (
                  <div
                    key={url}
                    className={`mx-auto w-20 h-20 rounded-full overflow-hidden border-4 ${selectedPetAvatar === url ? "border-aqua" : "border-transparent"} cursor-pointer`}
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

      <Button
        text={updatePetPending ? "수정 중.." : "수정하기"}
        backgroundColor="green"
        width="medium"
        onClick={handleUpdatePet}
      />
    </div>
  );
};

export default PetUpdate;
