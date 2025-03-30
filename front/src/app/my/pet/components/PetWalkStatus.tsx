"use client";

import React from "react";
import { useGetPetWalkingHistory } from "@/hooks/walk/useGetPetWalkingHistory";
interface PetWalkStatusProps {
  petId: number;
  name: string;
}
const PetWalkStatus = ({ petId, name }: PetWalkStatusProps) => {
  const { data: petWalkList, isLoading, isError } = useGetPetWalkingHistory(petId);

  if (isLoading) return <div>{name} 로딩 중...</div>;
  if (isError) return <div>{name} 산책 기록 불러오기 실패</div>;

  const walkCountThisMonth =
    petWalkList?.filter((walk) => {
      const date = new Date(walk.startTime);
      const now = new Date();
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    }).length ?? 0;

  return (
    <div>
      {name}: {walkCountThisMonth}회 / 30일
    </div>
  );
};

export default PetWalkStatus;
