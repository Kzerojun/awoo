"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import TopBar from "@/common/ui/TopBar";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { changeWalkingSelectView } from "@/lib/slices/userActionSlice";
import NoPet from "@/app/my/pet/components/NoPet";
import SelectDog from "../components/SelectDog";

const WalkPreSelectDogPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const petList = useAppSelector((state) => state.user.petList);
  // const currentView = 2; // 테스트를 위한 코드
  const currentView = useAppSelector((state) => state.userAction.currentWalkingSelectView);
  const petNum = petList?.length;

  // 반려견 정보 조회 useEffect로

  // 등록된 반려견 감지
  useEffect(() => {
    if (petNum === 0) {
      // 현재 뷰를 1 (강아지 등록 페이지)
      dispatch(changeWalkingSelectView(1));
    } else {
      // 현재 뷰를 2 (강아지 선택 페이지)
      dispatch(changeWalkingSelectView(2));
    }
  }, [petNum, dispatch]);

  return (
    <>
      <TopBar title="산책" />
      <main className="flex flex-col items-center justify-center mt-14">
        {currentView === 1 ? <NoPet /> : <SelectDog />}
      </main>
    </>
  );
};

export default WalkPreSelectDogPage;
