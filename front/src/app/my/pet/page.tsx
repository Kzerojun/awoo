"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { changeView } from "@/lib/slices/userActionSlice";
import { useEffect } from "react";

import NoPet from "./components/NoPet";
import PetMain from "./components/PetMain";

const Pet = () => {
  const dispatch = useAppDispatch();
  // const currentView = 2; // 테스트를 위한 코드 (펫 메인페이지)
  const currentView = useAppSelector((state) => state.userAction.currentView);
  const petList = useAppSelector((state) => state.user.petList);
  const petNum = petList?.length;

  useEffect(() => {
    if (petNum === 0) {
      // 현재 뷰를 1 (강아지 등록 유도 컴포넌트)
      dispatch(changeView(1));
    } else {
      // 현재 뷰를 2 (메인 캘린더 컴포넌트로)
      dispatch(changeView(2));
    }
  }, [petNum, dispatch]);

  return (
    <>
      <CommonTopBar title="마이펫" leftAction="back" />
      <main className="mt-14 px-4 h-[calc(100vh-112px)]">
        {currentView === 1 ? <NoPet /> : <PetMain />}
      </main>
    </>
  );
};

export default Pet;
