"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommonTopBar from "@/common/ui/CommonTopBar";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { changeWalkingSelectView } from "@/lib/slices/userActionSlice";
import NoPet from "@/app/my/pet/components/NoPet";
import SelectDog from "../components/SelectDog";
import { PetInterface } from "@/lib/slices/petSlice";
import { usePetList } from "@/hooks/pet/usePetList";
import { setPetList } from "@/lib/slices/petSlice";

const WalkPreSelectDogPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    refetch: petListRefetch,
    isLoading: petListIsLoading,
    isError: petListError,
  } = usePetList();
  // const petList = useAppSelector((state) => state.user.petList);
  const [localPetList, setLocalPetList] = useState<PetInterface[] | null>(null);
  // const currentView = 2; // 테스트를 위한 코드
  const currentView = useAppSelector((state) => state.userAction.currentWalkingSelectView);
  const petNum = localPetList?.length;

  // 반려견 정보 조회 useEffect로
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
        if (petListError) {
          console.error("반려견 목록 조회 실패임요!");
          // TODO: 나중에 주석 해제
          // dispatch(changeWalkingSelectView(1));
        }
      } catch (err) {
        console.error("반려견 목록 조회 실패임요!", err);
        dispatch(changeWalkingSelectView(1));
      }
    };
    fetchPetList();
  }, []);

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
      <CommonTopBar title="산책" />
      <main className="flex flex-col items-center justify-center mt-14">
        {currentView === 1 ? <NoPet /> : <SelectDog />}
      </main>
    </>
  );
};

export default WalkPreSelectDogPage;
