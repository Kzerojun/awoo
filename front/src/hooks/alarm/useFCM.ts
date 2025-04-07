import { useState } from "react";
import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "@/firebase-config";
import axiosInstance from "@/api/axiosInstance";

export const useFCMToken = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  const requestPermission = async () => {
    const supported = await isSupported();
    if (!supported) return false;
    const permission = await Notification.requestPermission();
    return permission === "granted";
  };

  const getAndSendToken = async () => {
    const permissionGranted = await requestPermission();
    if (!permissionGranted) return;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
    });

    if (!token) {
      console.warn("FCM 토큰을 가져올 수 없습니다.");
      return;
    }

    // 기존 토큰 여부 관계없이 무조건 서버로 전송
    try {
      console.log("🚀 [FCM] 토큰 무조건 전송:", token);
      await axiosInstance.post("/alarms/tokens", { token });
      localStorage.setItem("fcmToken", token);
      setFcmToken(token);
    } catch (err) {
      console.error("❌ [FCM] 토큰 전송 실패:", err);
    }
  };

  // ✅ 앱 진입시 토큰만 검사 & 갱신용
  const checkAndUpdateToken = async () => {
    const permissionGranted = await requestPermission();
    if (!permissionGranted) return;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
    });

    if (!token) {
      console.warn("FCM 토큰을 가져올 수 없습니다.");
      return;
    }

    const oldToken = localStorage.getItem("fcmToken");

    if (token !== oldToken) {
      console.log("🔄 [FCM] 앱 진입 후 토큰 변경 감지 → 서버 갱신");
      await axiosInstance.post("/alarms/tokens", { token });
      localStorage.setItem("fcmToken", token);
      setFcmToken(token);
    } else {
      console.log("✅ [FCM] 기존 토큰 그대로 사용");
    }
  };
  // 📍 최초 회원가입 후 권한 요청만 할 때
  const onlyRequestPermission = async () => {
    const permission = await Notification.requestPermission();
    console.log("🔔 권한 요청 결과:", permission);
    return permission === "granted"; // 반드시 boolean 반환
  };

  return { fcmToken, getAndSendToken, onlyRequestPermission, checkAndUpdateToken };
};
