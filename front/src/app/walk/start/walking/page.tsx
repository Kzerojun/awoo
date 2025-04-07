"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import useLocationPermission from "../../hooks/useLocationPermission";
import useLocationTracking from "../../hooks/useLocationTracking";
import dynamic from "next/dynamic";
import Image from "next/image";
import Button from "@/common/ui/Button";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setWalkData } from "@/lib/slices/walkSlice";

import paw from "../../../../../public/icons/white_paw.svg";
import dog from "../../../../../public/icons/walking/dog.svg";

const MapTraking = dynamic(() => import("../../components/MapTraking"), { ssr: false });

const formatTime = (date: Date | null) => {
  if (!date) return "시간 없음";
  return date.toLocaleTimeString();
};

const formatElapsedTime = (seconds: number) => {
  const flooredSeconds = Math.floor(seconds);
  const hours = Math.floor(flooredSeconds / 3600);
  const minutes = Math.floor((flooredSeconds % 3600) / 60);
  const remainingSeconds = flooredSeconds % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
  }
  return `${minutes}분 ${remainingSeconds}초`;
};

const Walking = () => {
  const {
    startTracking,
    stopTracking,
    isTracking,
    elapsedTime,
    startTime,
    endTime,
    distance,
    positions,
    currentPosition,
    startPosition,
  } = useLocationTracking();
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [totalWalkTime, setTotalWalkTime] = useState<string | null>(null);
  const [walkStartTime, setWalkStartTime] = useState<string | null>(null);
  const [walkEndTime, setWalkEndTime] = useState<string | null>(null);
  const [isTrackingStopped, setIsTrackingStopped] = useState<boolean>(false); // 트래킹 여부
  const [displayElapsedTime, setDisplayElapsedTime] = useState<string>("0분 0초"); // 표시되는 시간
  const router = useRouter();
  const dispatch = useAppDispatch();
  const walkingDog = useAppSelector((state) => state.walk.currentWalkingDog);

  // 페이지 진입 시 트래킹 정보 초기화
  useEffect(() => {
    setTrackingStarted(false);
    setIsTrackingStopped(false);
  }, []);

  useEffect(() => {
    console.log(walkingDog);

    if (startTime) {
      setWalkStartTime(formatTime(startTime));
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime) {
      setWalkEndTime(formatTime(endTime));
    }
  }, [endTime]);

  // 상단 표시 시간
  useEffect(() => {
    if (!isTrackingStopped) {
      // console.log("⏳ elapsedTime 업데이트:", elapsedTime); // 디버깅용 로그
      setDisplayElapsedTime(formatElapsedTime(elapsedTime));
    }
  }, [elapsedTime, isTrackingStopped]);

  const handleStartWalk = () => {
    startTracking(); // 위치, 시간 트래킹 시작
    setTrackingStarted(true);
  };

  // 종료 버튼 누르면 기록 종료 + 시간 기록
  const handleStopTracking = () => {
    const end = stopTracking();
    setIsTrackingStopped(true);
    const totalTime = formatElapsedTime(elapsedTime); // 총 산책 시간
    setTotalWalkTime(totalTime);

    dispatch(
      setWalkData({
        startTime: startTime?.toISOString(),
        endTime: end.toISOString(),
        totalTime,
        distance: distance ? parseFloat(distance.toFixed(2)) : 0,
      })
    );
  };

  // 사진 찍기 페이지로 이동
  const goToPhoto = () => {
    router.push("/walk/take-photo");
  };

  // 적금 납입 선택 or 그런 걸로 이동
  const goToCheckPay = () => {
    router.push("/walk/end/check");
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 지도 */}
      <div className="absolute inset-0 z-0">
        <MapTraking
          onMapReady={() => setIsMapReady(true)}
          positions={positions}
          currentPosition={currentPosition}
          startPosition={startPosition}
          isTracking={isTracking}
          distance={distance}
        />
      </div>

      {/* 상태 표시 (optional) */}
      <div
        className={`absolute top-5 left-1/2 -translate-x-1/2 
    text-white text-base z-10 bg-black/60 px-4 py-2 
    rounded-full shadow text-center 
    transition-all duration-300 ease-in-out 
    whitespace-nowrap w-fit max-w-[90vw]
    ${isTracking ? "animate-pulse" : ""}`}
      >
        {trackingStarted && isTracking
          ? `⏳ 산책 중: ${displayElapsedTime} | ${distance.toFixed(2)}km`
          : trackingStarted && !isTracking
            ? "🏁 산책 종료!"
            : "🚩 산책을 시작해보세요!"}
      </div>

      {/* 버튼들 */}
      {!isTracking && isMapReady && !trackingStarted && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <Button text="산책 시작!" onClick={handleStartWalk} img={paw} backgroundColor="green" />
        </div>
      )}

      {isTracking && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <Button
            text="끝내기"
            img={paw}
            onClick={handleStopTracking}
            backgroundColor="light-green"
          />
        </div>
      )}

      {!isTracking && trackingStarted && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col gap-3 items-center">
          <Button text="사진 찍기" img={paw} onClick={goToPhoto} backgroundColor="green" />
          <Button
            text="건너 뛰기"
            onClick={goToCheckPay}
            backgroundColor="white"
            border="green"
            fontColor="green"
          />
        </div>
      )}
    </div>
  );
};

export default Walking;
