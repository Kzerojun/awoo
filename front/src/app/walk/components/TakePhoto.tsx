"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setWalkData } from "@/lib/slices/walkSlice";
import Image from "next/image";
import dogPhoto from "../../../../public/icons/walking/dog_photo.svg";
import cameraIcon from "../../../../public/icons/walking/cameraIcon.svg";

import Button from "@/common/ui/Button";
const TakePhoto = () => {
  const dogName = useAppSelector((state) => state.walk.currentWalkingDog?.name);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

  const photoData = useAppSelector((state) => state.walk.photo);

  // 들어오자마자 카메라 시작
  useEffect(() => {
    startCamera();

    // 페이지 나갈 때 종료
    return () => {
      stopCamera();
    };
  }, []);

  // 카메라 시작
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // 후면 카메라 사용
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsCameraOn(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      console.error("카메라 접근 실패:", error);
    }
  };

  // 카메라 종료
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  //Redux 상태 변경을 감지하여 로그 출력
  // useEffect(() => {
  //   if (photoData) {
  //     console.log("📸 Redux에 저장된 사진 데이터:", photoData);
  //   }
  // }, [photoData]);

  // 사진 촬영 및 Redux 저장 후 이동
  const captureImage = () => {
    console.log("📸 사진 촬영 시도");
    if (!videoRef.current) {
      console.warn("⚠️ videoRef가 null입니다.");
    }

    if (!canvasRef.current) {
      console.warn("⚠️ canvasRef가 null입니다.");
    }
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");

      dispatch(setWalkData({ photo: dataUrl }));

      stopCamera();
      setTimeout(() => {
        console.log(photoData);
        router.push("/walk/photo-check"); // Redux 업데이트 후 페이지 이동
      }, 100); // Redux 업데이트 후 약간의 지연을 추가
    }
  };
  const goToCheckPay = () => {
    stopCamera();
    dispatch(setWalkData({ photo: null }));
    router.push("/walk/end/check");
  };
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 카메라 미리보기 (비디오 전체 채우기) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* 오버레이 UI */}
      <div className="absolute top-6 left-0 right-0 flex items-center justify-center gap-x-3 z-10">
        <Image src={cameraIcon} alt="카메라 아이콘" width={35} height={35} />
        <div className="text-2xl text-white drop-shadow-lg">사진 촬영</div>
      </div>

      {/* 하단 버튼 오버레이 */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-50">
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
          onClick={goToCheckPay}
          disabled={!isCameraOn}
        >
          건너 뛰기
        </button>
        <button
          className="px-4 py-2 bg-green text-white rounded-lg"
          type="button"
          onClick={captureImage}
        >
          사진 촬영
        </button>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default TakePhoto;
