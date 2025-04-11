"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { changeMyPetView } from "@/lib/slices/userActionSlice";
import React, { useEffect, useState } from "react";
import { usePetList } from "@/hooks/pet/usePetList";
import { setPetList } from "@/lib/slices/petSlice";
import NoPet from "./components/NoPet";
import PetMain from "./components/PetMain";
import { PetInterface } from "@/lib/slices/petSlice";
import PetList from "./components/PetList";

const Pet = () => {
  const dispatch = useAppDispatch();
  // const currentView = 2; // 테스트를 위한 코드 (펫 메인페이지)
  const { refetch: petListRefetch, isLoading: petListIsLoading } = usePetList();
  const currentView = useAppSelector((state) => state.userAction.currentMyPetView);
  // const petList = useAppSelector((state) => state.pet.petList);
  const [localPetList, setLocalPetList] = useState<PetInterface[] | null>(null);
  const petNum = localPetList?.length;

  // 반려견 정보 조회 useEffect 로
  useEffect(() => {
    const fetchPetList = async () => {
      try {
        const result = await petListRefetch();
        console.log("반려견 목록 조회", result.data);
        console.log("반려견 목록에서 펫 데이터", result?.data);

        if (result.isSuccess && result.data) {
          setLocalPetList(result.data);
          dispatch(setPetList(result.data));
        }
      } catch (err) {
        console.error("반려견 목록 조회 실패임요!", err);
      }
    };
    fetchPetList();
  }, []);

  useEffect(() => {
    if (petNum === 0) {
      // if (petNum === 0 || localPetList === null) {
      // 현재 뷰를 1 (강아지 등록 유도 컴포넌트)
      dispatch(changeMyPetView(1));
    } else {
      // 현재 뷰를 2 (메인 컴포넌트로)
      dispatch(changeMyPetView(2));
    }
  }, [petNum, dispatch]);

  return (
    <>
      <CommonTopBar title="마이펫" backUrl="/my" />
      <main className="mt-14 px-4 min-h-[calc(100dvh-7rem)]">
        {currentView === 1 ? <NoPet /> : <PetList />}
      </main>
    </>
  );
};

export default Pet;
