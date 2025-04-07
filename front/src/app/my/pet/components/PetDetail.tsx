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
          <section className="w-72 bg-[#E2F0EF]/80 border border-[#B0D4CD] shadow rounded-xl p-5 text-sm text-gray-800">
            <h3 className="text-lg font-bold text-center text-[#33665A] mb-3">반려견 정보 🐾</h3>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-medium">이름</span>
                <span>{pet.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">나이</span>
                <span>{pet.age}살</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">견종</span>
                <span>{pet.breed}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="rounded-2xl border border-aqua w-14 h-8 text-sm text-custom-gray"
                onClick={goToUpdate}
              >
                수정
              </button>
            </div>
          </section>

          {/* 산책 정보 */}
          <section className="w-72 bg-[#F0FDF4] border border-[#C3EEC7] shadow rounded-xl p-5 text-sm text-gray-800">
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

            <div className="mt-4 flex justify-center">
              <Button
                text="산책 기록 더보기"
                width="medium"
                backgroundColor="white"
                border="green"
                fontColor="green"
                onClick={() => showWalkDetail(pet.petId)}
              />
            </div>
          </section>
          {/* 적금 상품 */}
          {petSavingData ? (
            <div className="flex flex-col gap-3 bg-[#BEE1E6]/80 border border-[#A6C1CF] shadow-lg rounded-xl p-5 w-72 text-sm text-gray-800">
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
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-5 mt-10">
          <h3 className="text-lg font-semibold text-center text-green">산책 기록</h3>
          {petWalkList?.map((walk) => (
            <div key={walk.walkId} className="flex flex-col items-center justify-center gap-y-5">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-6 py-4 flex flex-col gap-y-3">
                <div className="flex flex-col justify-center items-center text-sm text-gray-600 gap-y-3">
                  <p>
                    🕒 <span className="font-medium">시작 시간:</span> {formatDate(walk.startTime)}
                  </p>
                  <p>
                    🛑 <span className="font-medium">종료 시간:</span> {formatDate(walk.endTime)}
                  </p>
                </div>

                <div className="text-base font-semibold text-center text-green">
                  총 거리: {walk.distance}km
                </div>
              </div>
            </div>
          ))}
          <Button
            text="뒤로가기"
            backgroundColor="white"
            border="green"
            fontColor="green"
            width="medium"
            onClick={goToBack}
          />
        </div>
      )}
    </div>
  );
};

export default PetDetail;
