"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import { setWalkData } from "@/lib/slices/walkSlice";

const TakePhoto = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);

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
    } catch (error) {
      console.error("카메라 접근 실패:", error);
    }
  };

  // 카메라 종료
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
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
      router.push("/walk/photo-check");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-lg border rounded-lg shadow-lg"
      />
      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-4 flex gap-4">
        {!isCameraOn && (
          <button
            onClick={startCamera}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={isCameraOn}
          >
            카메라 시작
          </button>
        )}
        {isCameraOn && (
          <button onClick={captureImage} className="px-4 py-2 bg-green-500 text-white rounded-lg">
            사진 촬영
          </button>
        )}
        {isCameraOn && (
          <button
            onClick={stopCamera}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            disabled={!isCameraOn}
          >
            카메라 종료
          </button>
        )}
      </div>
    </div>
  );
};

export default TakePhoto;
