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
import { format } from "date-fns";

const CheckEnd = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const startTime = useAppSelector((state) => state.walk.startTime);
  const endTime = useAppSelector((state) => state.walk.endTime);
  const petId = useAppSelector((state) => state.walk.currentWalkingDog?.petId);
  const totalTime = useAppSelector((state) => state.walk.totalTime);

  // const distance = 3.2;
  const distance = useAppSelector((state) => state.walk.distance);

  // 배경
  const backgroundImage = useAppSelector((state) => state.walk.selectBackgroundImage);

  // 산책 기록 저장 상태
  const [isSaveSuccess, setIsSaveSuccess] = useState<boolean>(false);

  const {
    mutate: walkingCountMutation,
    isPending: walkingCountPending,
    isSuccess: walkingCountSuccess,
    isError: walkingCountError,
  } = useWalkingCount();

  const [showCongratulations, setShowCongratulations] = useState<boolean>(true);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setShowCongratulations(false);
    }, 2500);

    return () => {
      clearTimeout(animationTimer);
    };
  }, []);

  useEffect(() => {
    if (!petId || !startTime || !endTime || distance == null) {
      console.warn("산책 기록 누락: 필수 정보 누락");
      setIsSaveSuccess(false);
      return;
    }
    console.log(
      "산책 데이터 확인",
      "petID:",
      petId,
      "startTime",
      format(new Date(startTime), "yyyy-MM-dd'T'HH:mm:ss"),
      "endTime",
      format(new Date(endTime), "yyyy-MM-dd'T'HH:mm:ss"),
      "distance",
      distance
    );

    walkingCountMutation(
      {
        petId,
        startTime: format(new Date(startTime), "yyyy-MM-dd'T'HH:mm:ss"),
        endTime: format(new Date(endTime), "yyyy-MM-dd'T'HH:mm:ss"),
        distance,
      },
      {
        onSuccess: (data) => {
          console.log("산책 기록 성공:", data);
          setIsSaveSuccess(true);
        },
        onError: (err) => {
          console.error("산책 기록 실패:", err);
          setIsSaveSuccess(false);
        },
      }
    );
  }, []);

  const goToHome = async () => {
    if (walkingCountSuccess) {
      alert("산책 기록이 저장되었습니다.");
    } else if (walkingCountError) {
      alert("산책 기록 저장에 실패했습니다. \n 1:1 문의를 이용해주세요.");
    } else {
      alert("산책 기록을 저장 중입니다.");
    }
    router.push("/home");
  };

  const goToDetail = () => {
    if (walkingCountSuccess) {
      alert("산책 기록이 저장되었습니다.");
    } else if (walkingCountError) {
      alert("산책 기록 저장에 실패했습니다. \n 1:1 문의를 이용해주세요.");
    } else {
      alert("산책 기록을 저장 중입니다.");
    }
    if (!petId) {
      alert("오류가 발생했습니다. \n 1:1 문의를 이용해주세요.");
      router.push("/home");
    }
    router.push(`/my/pet/detail/${petId}`);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center py-20">
        <div
          className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-300"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: "blur(4px)",
          }}
        />
        {showCongratulations && (
          <div className="overflow absolute inset-0 pointer-events-none">
            <CongratulationsEffect />
          </div>
        )}
        <div className="relative py-10 z-50 flex flex-col items-center justify-center gap-y-20 bg-white/20 w-80 rounded-lg ">
          <div className="flex flex-col items-center justify-center gap-6">
            <span className="flex justify-center items-center gap-x-2">
              <h1 className="text-4xl ">산책이 끝났습니다!</h1>
            </span>
            <h2 className="text-2xl">산책이 기록됩니다.</h2>
          </div>
          {/* 산책 데이터 */}
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-5">
              <span className="flex justify-center items-center">
                <Image src={clock} alt="시계 이모지" />
                <h2 className="text-lg">총 산책 시간</h2>
              </span>

              <p className="text-3xl font-bold">{totalTime}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <span className="flex justify-center items-center">
                <Image src={pin} alt="핀 이모지" />
                <h2 className="text-lg">총 산책 거리</h2>
              </span>

              <p className="text-3xl font-bold">{distance} km</p>
            </div>
          </div>
          <div className="relative w-full flex-col flex items-center justify-center">
            {/* <WalkingWithDog /> */}
            <div className="flex flex-col items-center justify-center gap-5">
              <Button
                text="보러가기"
                onClick={goToDetail}
                backgroundColor="light-green"
                img={paw}
                width="medium"
                disabled={walkingCountPending}
              />
              <Button
                text={walkingCountPending ? "저장 중.." : "홈으로"}
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
    </>
  );
};

export default CheckEnd;
