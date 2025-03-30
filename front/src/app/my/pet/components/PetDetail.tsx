"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { PetInterface } from "@/lib/slices/petSlice";
import Image from "next/image";
import { useGetPetWalkingHistory } from "@/hooks/walk/useGetPetWalkingHistory";
import Button from "@/common/ui/Button";
import walkingIcon from "../../../../../public/icons/walking/walkingIcon.svg";
import { changeCurrentPetDetailView } from "@/lib/slices/userActionSlice";

const PetDetail = ({ pet }: { pet: PetInterface }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentView = useAppSelector((state) => state.userAction.currentPetDetailView);
  const { data: petWalkList, isLoading, isError } = useGetPetWalkingHistory(pet.petId);
  // 적금 개설 안 되어있으면 /account/open/saving 로 이동

  //   이번달 산책 조회
  const walkCountThisMonth =
    petWalkList?.filter((walk) => {
      const date = new Date(walk.startTime);
      const now = new Date();
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    }).length ?? 0;

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
    <div className="w-full flex flex-col justify-center items-center gap-y-5">
      {currentView === 1 ? (
        <>
          {/* 사진 + 이름 (상단) */}
          <div className="w-72 mt-10 border-b-2 border-custom-gray flex flex-col justify-center items-center gap-y-3">
            <Image
              src={pet?.profileImage ?? "/images/pet-avatars/petava_basic.png"}
              alt="프로필 이미지"
              width={100}
              height={100}
              className="rounded-full"
            />

            <div className="mb-3 text-lg">{pet.name}</div>
          </div>
          {/* 하단 */}
          <div className="w-72 border-b-2 border-custom-gray flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center gap-y-5">
              {/* 나이 */}
              <div className="flex items-center gap-x-10">
                <span>나이</span>
                <span>{pet.age}살</span>
              </div>
              {/* 견종 */}
              <div className="flex items-center gap-x-10">
                <span>견종</span>
                <span>{pet.breed}</span>
              </div>
            </div>
            {/* 산책 기록 */}
            <div className="flex flex-col items-center justify-center gap-y-3">
              <div className="flex items-center justify-center gap-x-3">
                <Image src={walkingIcon} alt="산책 아이콘" className="w-8 h-8" />
                <div className="text-lg">이번 달 산책 기록</div>
              </div>

              {isLoading ? (
                <div>로딩 중...</div>
              ) : isError ? (
                <div>산책 기록 불러오기 실패</div>
              ) : (
                <span>{walkCountThisMonth}회 / 30일</span>
              )}
              <Button
                text="산책 기록 더보기"
                width="medium"
                backgroundColor="white"
                border="green"
                fontColor="green"
                onClick={() => showWalkDetail(pet.petId)}
              />
              <div className="w-full flex justify-end mb-3">
                <button
                  className="rounded-2xl border-1 border-aqua w-20 h-8 text-sm text-custom-gray"
                  onClick={goToUpdate}
                >
                  수정하기
                </button>
              </div>
            </div>
          </div>
          {/* 적금 상품 */}
          <div>반려견별 적금 상품</div>
        </>
      ) : (
        <>
          {petWalkList?.map((walk) => (
            <div key={walk.walkId} className="flex flex-col items-center justify-center gap-y-5">
              <h3 className="text-lg font-semibold text-center text-green">산책 기록</h3>
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
              <Button
                text="뒤로가기"
                backgroundColor="white"
                border="green"
                fontColor="green"
                width="medium"
                onClick={goToBack}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PetDetail;
