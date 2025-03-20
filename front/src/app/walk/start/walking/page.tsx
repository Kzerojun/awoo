"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useLocationPermission from "../../hooks/useLocationPermission";
import useLocationTracking from "../../hooks/useLocationTracking";
import dynamic from "next/dynamic";
import Button from "@/common/ui/Button";

import { useAppDispatch } from "@/lib/store";
import { setWalkData } from "@/lib/slices/walkSlice";

import paw from "../../../../../public/icons/white_paw.svg";

const MapTraking = dynamic(() => import("../../components/MapTraking"), { ssr: false });

const formatTime = (date: Date | null) => {
  if (!date) return "시간 없음";
  return date.toLocaleTimeString();
};

const formatElapsedTime = (seconds: number) => {
  const flooredSeconds = Math.floor(seconds);
  const minutes = Math.floor(flooredSeconds / 60);
  const remainingSeconds = flooredSeconds % 60;
  return `${minutes}분 ${remainingSeconds}초`;
};

const Walking = () => {
  const { requestPermission } = useLocationPermission();
  const { stopTracking, isTracking, elapsedTime, startTime, endTime, distance } =
    useLocationTracking();
  const [totalWalkTime, setTotalWalkTime] = useState<string | null>(null);
  const [walkStartTime, setWalkStartTime] = useState<string | null>(null);
  const [walkEndTime, setWalkEndTime] = useState<string | null>(null);
  const [isTrackingStopped, setIsTrackingStopped] = useState<boolean>(false); // 트래킹 여부
  const [displayElapsedTime, setDisplayElapsedTime] = useState<string>("0분 0초"); // 표시되는 시간
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    requestPermission(); //페이지가 로드될 때 권한 요청
  }, []);

  useEffect(() => {
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

  // 종료 버튼 누르면 기록 종료 + 시간 기록
  const handleStopTracking = () => {
    stopTracking();
    setIsTrackingStopped(true);
    const totalTime = formatElapsedTime(elapsedTime); // 총 산책 시간
    setTotalWalkTime(totalTime);

    dispatch(
      setWalkData({
        startTime: walkStartTime,
        endTime: walkEndTime,
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
    <div className="flex flex-col items-center w-full px-8 justify-center">
      <div>산책중....</div>
      <div className="text-2xl font-semibold text-green">산책 시간 : {displayElapsedTime}</div>
      <div className="w-full max-w-3xl h-[60vh] mb-8">
        <MapTraking />
      </div>

      {isTracking ? (
        <Button
          text="산책 종료"
          img={paw}
          onClick={handleStopTracking}
          backgroundColor="light-green"
        />
      ) : (
        <>
          <div className="mt-4 p-2 text-xl text-green-600">
            🏁 산책 종료!
            <br />
            산책 거리 : {distance} <br />
            시작 시간 : {walkStartTime} <br />
            🕓 종료 시간: {walkEndTime} <br />⏳ 총 산책 시간: {totalWalkTime}
          </div>
          <div className="flex flex-col justify-center items-center gap-y-3">
            <Button text="사진 찍기" img={paw} onClick={goToPhoto} />
            <Button text="건너 뛰기" onClick={goToCheckPay} />
          </div>
        </>
      )}
    </div>
  );
};

export default Walking;
