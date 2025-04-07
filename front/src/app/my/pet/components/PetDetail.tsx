"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { PetInterface } from "@/lib/slices/petSlice";
import Image from "next/image";
import Button from "@/common/ui/Button";
import walkingIcon from "../../../../../public/icons/walking/walkingIcon.svg";
import { changeCurrentPetDetailView } from "@/lib/slices/userActionSlice";
import { useGetPetWalkInMonthHistory } from "@/hooks/walk/useGetPetWalkInMonthHistory";
import { useGetPetWalkingHistory } from "@/hooks/walk/useGetPetWalkingHistory";
import { SavingResponse } from "@/api/account/my/saving";
import { useGetSavingAccount } from "@/hooks/account/saving/useGetSavingAccount";

const PetDetail = ({ pet }: { pet: PetInterface }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentView = useAppSelector((state) => state.userAction.currentPetDetailView);
  const savingId = pet.savingId;
  const [petSavingInfo, setPetSavingInfo] = useState<SavingResponse | null>(null);

  // 전체 기록
  const { data: petWalkList, isLoading, isError } = useGetPetWalkingHistory(pet.petId);
  // 이번달
  const {
    data: petWalkInMonthList,
    isLoading: walkInMonthLoading,
    isError: walkInMonthError,
  } = useGetPetWalkInMonthHistory(pet.petId);
  // 적금 개설 안 되어있으면 /account/open/saving 로 이동
  // 강아지 적금 정보 단건 조회
  const { data: petSavingData, isPending: petSavingPending } = useGetSavingAccount(
    String(savingId)
  );

  useEffect(() => {
    return () => {
      dispatch(changeCurrentPetDetailView(1));
    };
  }, []);

  const showWalkDetail = (petId: number) => {
    dispatch(changeCurrentPetDetailView(2));
  };

  const goToBack = () => {
    dispatch(changeCurrentPetDetailView(1));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const pad = (n: number) => n.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  };

  const goToUpdate = () => {
    router.push(`/my/pet/detail/update/${pet.petId.toString()}`);
  };

  const goToSaving = () => {
    // TODO: 적금 등록 페이지로 이동
    router.replace("/account/open/saving");
  };
  return (
    <div className="w-full mb-10 flex flex-col justify-center items-center gap-y-5">
      {currentView === 1 ? (
        <>
          {/* 사진 + 이름 (상단) */}
          <section className="w-72 mt-10 flex flex-col justify-center items-center gap-y-3">
            <Image
              src={pet?.profileImage ?? "/images/pet-avatars/petava_basic.png"}
              alt="프로필 이미지"
              width={100}
              height={100}
              className="rounded-full w-[100px] h-[100px]"
            />

            <div className="mb-3 text-lg">{pet.name}</div>
          </section>
          {/* 하단 */}
          <section className="w-72 bg-gradient-to-br from-[#f3f6dc] to-[#f9faf3] border border-[#e3e8a9] shadow-md rounded-xl p-6 text-sm text-gray-800 relative">
            <h3 className="text-lg font-bold text-center text-[#33665A] mb-4">반려견 정보 🐾 </h3>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-dashed border-[#B0D4CD] pb-1">
                <span className="font-medium">이름 🐶</span>
                <span className="text-right font-semibold">{pet.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-dashed border-[#B0D4CD] pb-1">
                <span className="font-medium">나이 🎂</span>
                <span className="text-right">{pet.age}살</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">견종 🐕</span>
                <span className="text-right">{pet.breed}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={goToUpdate}
                className="flex items-center gap-1 px-3 py-1.5 border border-[#b6c480] rounded-xl text-xs text-[#33665A] hover:bg-[#E6F4F1] transition"
              >
                ✏️ 수정
              </button>
            </div>
          </section>

          {/* 산책 정보 */}
          <section className="w-72 bg-[#F0FDF4] border border-[#C3EEC7] shadow-md rounded-xl p-5 text-sm text-gray-800">
            <h3 className="text-lg font-bold text-center text-green-700 mb-3">산책 정보 🌳</h3>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-medium">전체 산책 횟수</span>
                <span>{petWalkList?.length ?? 0}회</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">이번 달 인정 횟수</span>
                <span>{pet.walkInMonth}회</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => showWalkDetail(pet.petId)}
                className="flex items-center gap-1 px-3 py-1.5 border border-[#80C4B7] rounded-xl text-xs text-[#33665A] hover:bg-[#E6F4F1] transition"
              >
                ➕ 더보기
              </button>
            </div>
          </section>
          {/* 적금 상품 */}
          {petSavingData ? (
            <div className="flex flex-col gap-3 bg-[#BEE1E6]/50 border border-[#A6C1CF] shadow-md rounded-xl p-5 w-72 text-sm text-gray-800">
              <h3 className="text-lg font-bold text-center text-[#3A5F71] mb-2">
                {pet.name}의 적금 정보 🐶
              </h3>

              <div className="flex justify-between">
                <span className="font-semibold">적금 단계</span>
                <span>{petSavingData.accountName}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">현재 적금액</span>
                <span className="text-green-700 font-semibold">
                  {Number(petSavingData.totalBalance).toLocaleString("ko-KR")}원
                </span>
              </div>

              {/* <div className="flex flex-col items-center gap-y-2 mt-2 pt-2 border-t border-blue-200">
                <p className="text-sm font-medium">이번 달 산책 인정 횟수 🐾</p>
                <p className="text-xl text-blue-700 font-bold">{pet.walkInMonth} 회</p>
              </div> */}
            </div>
          ) : (
            <div className="flex flex-col gap-3 bg-[#BEE1E6]/80 border border-[#A6C1CF] shadow-lg rounded-xl p-5 w-72 text-sm text-gray-800">
              <h3 className="text-lg font-bold text-center text-[#3A5F71] mb-2">
                아직 적금에 가입하지 않았어요!
              </h3>
              <div className="flex justify-end">
                <button
                  onClick={goToSaving}
                  className="flex items-center gap-1 px-3 py-1.5 border border-[#A6C1CF] rounded-xl text-sm text-[#33665A] hover:bg-[#E6F4F1] transition"
                >
                  🧐 적금 상품 보러가기
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-6 mt-5">
          <h3 className="text-2xl font-bold text-center text-green flex items-center gap-x-2">
            🐾 산책 기록
          </h3>

          {petWalkList?.map((walk) => (
            <div
              key={walk.walkId}
              className="w-full max-w-md bg-white rounded-3xl shadow-xl px-6 py-6 transition hover:scale-[1.02] hover:shadow-2xl duration-200"
            >
              {/* 상단 아이콘 또는 타이틀 */}
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-green flex items-center gap-x-2">
                  🐶 {formatDate(walk.startTime).split(" ")[0]}{" "}
                  {formatDate(walk.startTime).split(" ")[1]}{" "}
                  {formatDate(walk.startTime).split(" ")[2]}
                </h4>
              </div>

              {/* 시간 정보 박스 */}
              <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-700 mb-4">
                <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center gap-y-3 shadow-inner">
                  <span className="font-semibold text-green">🕒 시작</span>
                  <span>
                    {formatDate(walk.startTime).split(" ")[3]}
                    {formatDate(walk.startTime).split(" ")[4]}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center gap-y-3 shadow-inner">
                  <span className="font-semibold text-rose-500">🛑 종료</span>
                  <span>
                    {formatDate(walk.startTime).split(" ")[3]}
                    {formatDate(walk.startTime).split(" ")[4]}
                  </span>
                </div>
              </div>

              {/* 총 거리 뱃지 */}
              <div className="flex justify-center">
                <span className="bg-gradient-to-r from-green to-emerald-400 text-white font-bold px-5 py-2 rounded-full text-sm shadow-md">
                  🏃 총 거리: {walk.distance}km
                </span>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <Button
              text="뒤로가기"
              backgroundColor="white"
              border="green"
              fontColor="green"
              width="medium"
              onClick={goToBack}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetail;
