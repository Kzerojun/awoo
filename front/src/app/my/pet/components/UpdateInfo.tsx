"use client";

import { useCheckOcr } from "@/hooks/pet/useCheckOcr";
import React, { ChangeEvent } from "react";

interface UpdateInfoProps {
  petName: string;
  setPetName: (v: string) => void;
  petAge: string;
  setPetAge: (v: string) => void;
  breed: string;
  setBreed: (v: string) => void;
}

const UpdateInfo = ({
  petName,
  setPetName,
  petAge,
  setPetAge,
  breed,
  setBreed,
}: UpdateInfoProps) => {
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

  return (
    <div className="w-72 border-t-2 border-custom-gray flex flex-col justify-center items-center gap-y-1">
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

export default UpdateInfo;
