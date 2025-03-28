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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

  const photoData = useAppSelector((state) => state.walk.photo);

  //Redux 상태 변경을 감지하여 로그 출력
  // useEffect(() => {
  //   if (photoData) {
  //     console.log("📸 Redux에 저장된 사진 데이터:", photoData);
  //   }
  // }, [photoData]);

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

  // 사진 촬영 및 Redux 저장 후 이동
  const captureImage = () => {
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
    <div className="flex flex-col items-center justify-center gap-5 h-full">
      <div className="flex items-center justify-center gap-x-3">
        <Image src={cameraIcon} alt="카메라 아이콘" width={35} height={35} />
        <div className="text-xl">사진 촬영</div>
      </div>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full max-w-lg border rounded-lg shadow-lg ${!isCameraOn ? "hidden" : ""}`}
      />
      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-4 flex gap-4">
        {!isCameraOn && (
          <div className="flex flex-col items-center justify-center gap-6">
            <span className="flex flex-col items-center justify-center gap-2">
              <div className="text-xl w-68 text-center">
                산책 종료, 아이들과 함께 사진을 찍어보세요!
              </div>
              <p>사진을 찍어 반려견과 추억을 쌓아보세요!</p>
            </span>
            <Image
              className="rounded-4xl"
              src={dogPhoto}
              alt="강아지 사진"
              width="300"
              height="300"
            />
            <button
              onClick={startCamera}
              className="px-4 py-2 bg-green text-white rounded-lg"
              disabled={isCameraOn}
            >
              카메라 시작
            </button>
          </div>
        )}
        {isCameraOn && (
          <button onClick={captureImage} className="px-4 py-2 bg-green text-white rounded-lg">
            사진 촬영
          </button>
        )}
        {isCameraOn && (
          <button
            onClick={goToCheckPay}
            className="px-4 py-2 bg-custom-gray text-white rounded-lg"
            disabled={!isCameraOn}
          >
            건너 뛰기
          </button>
        )}
      </div>
    </div>
  );
};

export default TakePhoto;
