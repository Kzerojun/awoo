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

const WalkingGuide = () => {
  const { requestPermission } = useLocationPermission();
  const router = useRouter();
  const walkingDog = useAppSelector((state) => state.userAction.currentWalkingDog);
  //   원래 코드
  const petProfile = walkingDog?.profileImage;
  const dogName = walkingDog?.name;

  const goToWalkStart = () => {
    requestPermission();
    console.log("산책으로 이동중");
    router.push("/walk/start/walking");
  };
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center gap-y-8">
        {/* 프로필 이미지 */}

        {petProfile ? (
          <Image
            src={petProfile}
            alt="강아지 프로필"
            width={100}
            height={100}
            className="rounded-full border-1 border-custom-gray"
          />
        ) : (
          <Image
            src={basicDog} // 기본 이미지
            alt="기본 프로필"
            width={100}
            height={100}
            className="rounded-full border-1 border-custom-gray"
          />
        )}

        {/* 나중에 현재 강아지 적금금액 추가하기 */}
        <div className="text-2xl">
          <span className="font-bold text-green">{dogName}</span>와 산책합니다!
        </div>

        {/* 산책 준비물 안내 */}
        <div className="w-60 flex flex-col justify-center gap-y-3">
          <div className="flex justify-center items-center  gap-x-3 border-b-1 py-3 border-custom-gray">
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
                <span>
                  <Image src={checkMark} alt="체크마크" width={30} height={30} />
                </span>
                <span>목줄 or 하네스</span>
              </div>
              <div className="flex items-center gap-x-3">
                <span>
                  <Image src={checkMark} alt="체크마크" width={30} height={30} />
                </span>
                <span>배변 봉투</span>
              </div>
              <div className="flex items-center gap-x-3">
                <span>
                  <Image src={checkMark} alt="체크마크" width={30} height={30} />
                </span>
                <span>간식과 물</span>
              </div>
            </div>
          </div>
        </div>

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
  );
};

export default WalkingGuide;
