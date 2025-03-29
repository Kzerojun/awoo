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

const CheckEnd = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const totalTime = useAppSelector((state) => state.walk.totalTime);
  const distance = useAppSelector((state) => state.walk.distance);

  const [showCongratulations, setShowCongratulations] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCongratulations(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const goToHome = () => {
    setTimeout(() => {
      router.push("/home");
    }, 500);
  };

  return (
    <>
      {!showCongratulations ? (
        <div className="w-full h-full bg-gradient-to-b from-green-100 to-blue-100 fixed bottom-0">
          <Lottie
            animationData={congratulations}
            loop={true}
            autoPlay
            style={{ width: 900, height: 900 }}
          />
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
              <Lottie
                animationData={withDog}
                loop={true}
                autoPlay
                style={{ width: 300, height: 300 }}
              />
              <div className="absolute bottom-50">
                <Button
                  text="홈으로"
                  onClick={goToHome}
                  backgroundColor="green"
                  img={paw}
                  width="medium"
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
