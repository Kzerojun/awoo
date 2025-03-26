"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import basicPet from "../../../../../public/images/pet-avatars/petava_basic.png";

interface Pet {
  petId: number;
  memberId: number;
  name: string;
  profileImage: string | null;
  breed: string;
  age: number;
  savingId: number;
}

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const router = useRouter();
  const petProfileImage: string | null = pet?.profileImage;
  const petId: string = String(pet?.petId);
  const goToPetDetail = () => {
    router.push(`/my/pet/detail/${petId}`);
  };

  return (
    <div
      className="w-full h-16 border-1 border-gray-300 rounded-2xl flex items-center justify-between p-4"
      onClick={goToPetDetail}
    >
      {/* 강아지 이미지 */}
      <div>
        {petProfileImage === null ? (
          <Image src={basicPet} alt="펫 기본 이미지" className="w-12 h-12 rounded-full" />
        ) : (
          <Image src={petProfileImage} alt="펫 이미지" />
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
