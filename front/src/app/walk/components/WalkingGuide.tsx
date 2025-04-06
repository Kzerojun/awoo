"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import useLocationPermission from "@/app/walk/hooks/useLocationPermission";
import Button from "@/common/ui/Button";
import Image from "next/image";
import basicDog from "../../../../public/images/pet-avatars/petava_basic.png";
import checkMark from "../../../../public/icons/walking/CheckMark.svg";
import backpack from "../../../../public/icons/walking/backpack.svg";
import paw from "../../../../public/icons/white_paw.svg";
import { useGetSavingAccount } from "@/hooks/account/saving/useGetSavingAccount";
import { SavingResponse } from "@/api/account/my/saving";

const WalkingGuide = () => {
  const { requestPermission } = useLocationPermission();
  const router = useRouter();
  const walkingDog = useAppSelector((state) => state.walk.currentWalkingDog);
  // 배경화면
  const backgroundImage = useAppSelector((state) => state.walk.selectBackgroundImage);

  const petProfile = walkingDog?.profileImage;
  const dogName = walkingDog?.name;
  // const dogName = "알버느티나얼";

  // 강아지 적금 아이디
  const savingId = useAppSelector((state) => state.walk.currentWalkingDog?.savingId);

  // 강아지 적금 정보 담을 객체
  const [petSavingInfo, setPetSavingInfo] = useState<SavingResponse | null>(null);
  // 강아지 적금 정보 조회
  const { data: petSavingData, isPending: petSavingPending } = useGetSavingAccount(
    String(savingId)
  );

  useEffect(() => {
    if (savingId && petSavingData) {
      setPetSavingInfo(petSavingData);
    }
  }, [savingId]);

  const goToWalkStart = () => {
    requestPermission();
    console.log("산책으로 이동중");
    router.push("/walk/start/walking");
  };
  return (
    <div className="relative h-[calc(100dvh-3.5rem)] w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-300 blur-xs"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div className="relative z-10 w-full max-w-md mx-auto h-full overflow-y-auto p-4 ">
        <div className="flex justify-center items-center">
          <div className=" w-80 bg-white/20 py-5 rounded-lg flex flex-col justify-center items-center gap-10">
            <div className="flex flex-col justify-center items-center gap-y-8">
              {/* 프로필 이미지 */}

              <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden border border-custom-gray">
                <Image
                  src={petProfile ?? basicDog}
                  alt="강아지 프로필"
                  fill
                  className="object-cover"
                />
              </div>

              {/* 나중에 현재 강아지 적금금액 추가하기 */}
              <div className="text-2xl text-center leading-tight">
                <span className="font-bold text-green">{dogName}</span>와(과) <br />
                산책합니다!
              </div>

              <div>
                {walkingDog && petSavingInfo ? (
                  <div className="flex flex-col items-center justify-center text-sm bg-blue-100 border border-blue-300 shadow-md rounded-lg p-4 w-72 rotate-[1deg]">
                    <h3 className="text-lg">{dogName}의 적금 정보</h3>
                    <div>적금 단계: {petSavingInfo.accountName}</div>
                    <div>
                      현재 적금액: {Number(petSavingInfo.totalBalance).toLocaleString("ko-KR")}
                    </div>
                    <div>이번 달 적금 인정 산책 횟수</div>
                    <p>{walkingDog.walkInMonth} 회</p>
                  </div>
                ) : (
                  <div className="text-sm">아직 가입된 적금 상품이 없습니다.</div>
                )}
              </div>

              {/* 적금 안내 */}
              <div className="p-5 flex flex-col justify-center items-center bg-gray-300/60 rounded-lg">
                <div>AwOO의 산책 인정 유의사항</div>

                <p>산책은 매달 20번, 하루 30분 이상, 3km 이상의 거리의 산책이 </p>
              </div>

              {/* 산책 준비물 안내 */}
              <div className="w-60 flex flex-col justify-center gap-y-3">
                <div className="flex justify-center items-center gap-x-3 border-b py-3 border-gray-100">
                  <span>
                    <Image src={backpack} alt="백팩" width={30} height={30} />
                  </span>
                  <div>산책 준비물</div>
                </div>
                <div className="text-center">잊지말고 챙기세요!</div>
                {/* 준비물 */}
                <div className="flex flex-col justify-center items-start">
                  <div className="mx-auto flex flex-col justify-center items-start gap-y-3">
                    <div className="flex items-center gap-x-3">
                      <span></span>
                      <span>목줄 or 하네스</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <span></span>
                      <span>배변 봉투</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <span></span>
                      <span>간식과 물</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* TODO: 산책 안내 더 상세하게 안내멘트 적기 */}

              <div className="text-center">
                즐거운 산책과 함께 <br />
                즐거운 저축도 실천하세요.
              </div>

              <Button
                text="산책하기"
                onClick={goToWalkStart}
                width="medium"
                backgroundColor="green"
                img={paw}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkingGuide;
