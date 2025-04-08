"use client";

import { useCheckOcr } from "@/hooks/pet/useCheckOcr";
import React, { ChangeEvent } from "react";

interface RegisterInfoProps {
  petName: string;
  setPetName: (v: string) => void;
  petAge: string;
  setPetAge: (v: string) => void;
  breed: string;
  setBreed: (v: string) => void;
  checkOcr: boolean;
  setCheckOcr: (v: boolean) => void;
  ocrImageUrl: string;
  setOcrImageUrl: (v: string) => void;
  animalRegNumber: string;
  setAnimalRegNumber: (v: string) => void;
}

const RegisterInfo = ({
  petName,
  setPetName,
  petAge,
  setPetAge,
  breed,
  setBreed,
  checkOcr,
  setCheckOcr,
  ocrImageUrl,
  setOcrImageUrl,
  animalRegNumber,
  setAnimalRegNumber,
}: RegisterInfoProps) => {
  // ocr 인증하기
  const { mutate: checkOcrMutate, isPending: checkOcrPending } = useCheckOcr();

  const nameMaxLength = 6;
  const breedMaxLength = 15;

  const handlePetName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, nameMaxLength);
    setPetName(value);
  };

  const handlePetAge = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setPetAge("");
      return;
    }
    setPetAge(value);
  };

  const handleBreed = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, breedMaxLength);
    setBreed(value);
  };
  const handleUploadOcrImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("제대로된 이미지를 선택해주세요.");
      return;
    }
    checkOcrMutate(
      { ocrImage: file },
      {
        onSuccess: (data) => {
          console.log("OCR 인증 성공", data);
          if (
            data &&
            data.animalName &&
            data.animalRegNumber &&
            data.breedType &&
            data.ocrImageUrl
          ) {
            setPetName(data.animalName);
            setBreed(data.breedType);
            setAnimalRegNumber(data.animalRegNumber);
            setOcrImageUrl(data.ocrImageUrl);
            alert("정보가 자동으로 입력되었습니다.");
            setCheckOcr(true);
          } else {
            alert("올바른 동물등록증을 올려주세요.");
            setPetName("");
            setBreed("");
            setAnimalRegNumber("");
            setOcrImageUrl("");
            setCheckOcr(false);
          }
        },
        onError: (err) => {
          console.error("OCR 인증 실패:", err);
          alert("OCR 인증에 실패했습니다. \n 나중에 다시 시도해주세요.");
          setCheckOcr(false);
        },
      }
    );
  };
  return (
    <div className="w-72 border-t-2 border-custom-gray flex flex-col justify-center items-center gap-y-2">
      <div className="flex flex-col justify-center items-center border border-teal-600 mt-5 w-60 shadow-xs rounded-lg p-3">
        {!checkOcrPending ? (
          <label className=" text-teal-700 cursor-pointer">
            동물등록증으로 등록하세요!📝
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadOcrImage}
              className="hidden"
            />
          </label>
        ) : (
          <div className="text-blue-700">OCR 인증 중...</div>
        )}
      </div>

      {/* 이름 */}
      <div className="flex flex-col justify-center items-center gap-y-2 mt-3">
        <div className="text-lg ">
          이름<span className="text-sm mx-2 text-custom-gray">(필수)</span>
        </div>
        <div className="relative w-60 flex justify-center items-center">
          <input
            type="text"
            className="border w-60 border-custom-gray rounded-2xl text-center h-10 placeholder:text-center focus:outline-none"
            placeholder="이름을 입력하세요"
            value={petName}
            maxLength={nameMaxLength}
            onChange={handlePetName}
          />
          {/* 글자수 표시 */}
          <span className="absolute right-3 text-xs text-gray-400">
            {petName.length}/{nameMaxLength}
          </span>
        </div>
      </div>
      {/* 동물 등록 번호 입력 */}
      <div className="flex flex-col justify-center items-center gap-y-2">
        <div className="text-lg">
          동물 등록 번호 <span className="text-sm mx-2 text-custom-gray">(필수)</span>
        </div>

        <input
          type="text"
          className={`border w-60 rounded-2xl text-center h-10 placeholder:text-center focus:outline-none ${
            checkOcr
              ? "border-custom-gray bg-white text-black"
              : "bg-gray-100 text-gray-400 border-gray-300"
          }`}
          placeholder={checkOcr ? "등록번호가 자동 입력됩니다" : "OCR 인증 후 자동 입력됩니다"}
          value={animalRegNumber}
          readOnly
          disabled={!checkOcr}
        />
      </div>

      {/* 나이 */}
      <div className="flex flex-col justify-center items-center gap-y-2">
        <div className="text-lg ">
          나이<span className="text-sm mx-2 text-custom-gray">(필수)</span>
        </div>

        <input
          type="number"
          className="border w-60 border-custom-gray rounded-2xl text-center h-10 placeholder:text-center focus:outline-none"
          placeholder="나이를 입력하세요"
          value={petAge}
          onChange={handlePetAge}
        />
      </div>

      {/* 견종 */}
      <div className="flex flex-col justify-center items-center gap-y-2">
        <div className="text-lg ">
          견종<span className="text-sm mx-2 text-custom-gray">(필수)</span>
        </div>
        <div className="relative w-60 flex justify-center items-center">
          <input
            type="text"
            className="border w-60 border-custom-gray rounded-2xl text-center h-10 placeholder:text-center focus:outline-none"
            placeholder="견종을 입력하세요"
            value={breed}
            maxLength={breedMaxLength}
            onChange={handleBreed}
          />
          {/* 글자수 표시 */}
          <span className="absolute right-2 text-xs text-gray-400">
            {breed.length}/{breedMaxLength}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterInfo;
