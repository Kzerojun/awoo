"use client";

import React, { useEffect } from "react";
import { useGetPetWalkingHistory } from "@/hooks/walk/useGetPetWalkingHistory";
import { useGetPetWalkInMonthHistory } from "@/hooks/walk/useGetPetWalkInMonthHistory";
interface PetWalkStatusProps {
  petId: number;
  name: string;
}
const PetWalkStatus = ({ petId, name }: PetWalkStatusProps) => {
  const { data: petWalkList, isLoading, isError } = useGetPetWalkingHistory(petId);
  const {
    data: petWalkInMonthData,
    isLoading: inMonthLoading,
    isError: inMonthError,
  } = useGetPetWalkInMonthHistory(petId);

  useEffect(() => {
    if (petWalkInMonthData) {
      console.log("이번달 산책", petWalkInMonthData);
    }
  }, []);

  if (isLoading || inMonthLoading) return <div>{name} 로딩 중...</div>;
  if (isError || inMonthError) return <div>{name} 산책 기록 불러오기 실패</div>;

  const walkAllCountThisMonth =
    petWalkList?.filter((walk) => {
      const date = new Date(walk.startTime);
      const now = new Date();
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    }).length ?? 0;

  const walkInMonth = petWalkInMonthData?.length;

  return (
    <div>
      {walkInMonth}회 | {walkAllCountThisMonth}회
    </div>
  );
};

export default PetWalkStatus;
