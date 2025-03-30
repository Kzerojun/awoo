"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Image from "next/image";
import Button from "@/common/ui/Button";
import Lottie from "lottie-react";
import congratulations from "@/assets/lottie/congratulations.json";
import withDog from "@/assets/lottie/withDog.json";
import congra from "../../../../public/icons/walking/confetti-ball.svg";
import clock from "../../../../public/icons/walking/clock.svg";
import pin from "../../../../public/icons/walking/map_pin.svg";
import paw from "../../../../public/icons/white_paw.svg";
import CongratulationsEffect from "./Congratulations";
import WalkingWithDog from "./WalkingWithDog";
import { useWalkingCount } from "@/hooks/walk/useWalkingCount";

const CheckEnd = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const startTime = useAppSelector((state) => state.walk.startTime);
  const endTime = useAppSelector((state) => state.walk.endTime);
  const petId = useAppSelector((state) => state.walk.currentWalkingDog?.petId);
  const totalTime = useAppSelector((state) => state.walk.totalTime);
  // 0을 허용을 안 해서 만든 가짜 데이터
  // TODO: 원래 데이터로 바꾸기
  // const distance = useAppSelector((state) => state.walk.distance);
  const distance: number = 3.2;

  const {
    mutate: walkingCountMutation,
    isPending: walkingCountPending,
    isSuccess: walkingCountSuccess,
    isError: walkingCountError,
  } = useWalkingCount();

  const [showCongratulations, setShowCongratulations] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCongratulations(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const goToHome = async () => {
    console.log(
      "산책 데이터 확인",
      "petID:",
      petId,
      "startTime",
      startTime,
      "endTime",
      endTime,
      "distance",
      distance
    );
    if (!petId || !startTime || !endTime || distance == null) {
      console.warn("산책 기록 누락: 필수 정보 누락");
      alert("산책 기록이 누락되었습니다. 1:1 문의를 남겨주세요. \n 홈으로 이동합니다.");
      setTimeout(() => {
        router.replace("/home");
      }, 1000);
      return;
    }
    try {
      await walkingCountMutation({
        petId,
        startTime,
        endTime,
        distance,
      });

      setTimeout(() => {
        router.push("/home");
      }, 500);
    } catch (err) {
      console.error("산책 기록 실패했음", err);
      alert("산책 기록에 실패했습니다. 1:1 문의를 이용해주세요. \n 홈으로 이동합니다.");
      setTimeout(() => {
        router.push("/home");
      }, 500);
    }
  };

  return (
    <>
      {!showCongratulations ? (
        <div className="w-full h-full bg-gradient-to-b from-green-100 to-blue-100 fixed bottom-0">
          <CongratulationsEffect />
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-b from-green-100 to-blue-100 py-20 fixed bottom-0">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col items-center justify-center gap-6">
              <span className="flex justify-center items-center gap-x-2">
                <Image src={congra} alt="축하 이모지" width="50" height="50" />
                <h1 className="text-4xl ">산책 종료</h1>
                <Image src={congra} alt="축하 이모지" width="50" height="50" />
              </span>
              <h2 className="text-2xl">산책이 기록되었습니다!</h2>
            </div>
            {/* 산책 데이터 */}
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="flex flex-col items-center justify-center gap-5">
                <span className="flex justify-center items-center">
                  <Image src={clock} alt="시계 이모지" />
                  <h2 className="text-2xl">총 산책 시간</h2>
                </span>

                <p className="text-3xl text-green">{totalTime}</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-5">
                <span className="flex justify-center items-center">
                  <Image src={pin} alt="핀 이모지" />
                  <h2 className="text-2xl">총 산책 거리</h2>
                </span>

                <p className="text-3xl text-green">{distance} km</p>
              </div>
            </div>
            <div className="relative w-full flex items-center justify-center">
              <WalkingWithDog />
              <div className="absolute bottom-50">
                <Button
                  text={walkingCountPending ? "저장 중.." : "산책 종료"}
                  onClick={goToHome}
                  backgroundColor="green"
                  img={paw}
                  width="medium"
                  disabled={walkingCountPending}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckEnd;
