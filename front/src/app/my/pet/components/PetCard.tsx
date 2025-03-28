"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import basicPet from "../../../../../public/images/pet-avatars/petava_basic.png";
import { PetInterface } from "@/lib/slices/petSlice";

interface PetCardProps {
  pet: PetInterface;
  clickable?: boolean;
  onSelect?: (pet: PetInterface) => void;
  selected?: boolean;
}

const PetCard = ({ pet, clickable = true, onSelect, selected = false }: PetCardProps) => {
  const router = useRouter();
  const petProfileImage: string | null = pet?.profileImage;
  const petId: number = pet?.petId;

  const handleClick = () => {
    if (clickable) {
      router.push(`/my/pet/detail/${petId}`);
    } else {
      onSelect?.(pet);
    }
  };

  return (
    <div
      className={`w-full h-16 border rounded-2xl flex items-center justify-between p-4 cursor-pointer transition-colors
    ${selected ? "border-green bg-light-green/30" : "border-gray-300 hover:bg-gray-100"}`}
      onClick={handleClick}
    >
      {/* 강아지 이미지 */}
      <div>
        {petProfileImage === null || petProfileImage === "" ? (
          <Image
            src={basicPet}
            alt="펫 기본 이미지"
            width={45}
            height={45}
            className="rounded-full"
          />
        ) : (
          <Image
            src={petProfileImage}
            alt="펫 이미지"
            width={45}
            height={45}
            className="rounded-full"
          />
        )}
      </div>
      {/* 강아지 이름 */}
      <div>{pet.name}</div>
      {/* 강아지 나이 */}
      <div>{pet.age} 살</div>
    </div>
  );
};

export default PetCard;
