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
    if (!token) return;

    const oldToken = localStorage.getItem("fcmToken");
    if (token !== oldToken) {
      await axiosInstance.post("/alarm/tokens", { token });
      localStorage.setItem("fcmToken", token);
      setFcmToken(token);
    }
  };

  // 📍 최초 회원가입 후 권한 요청만 할 때
  const onlyRequestPermission = async () => {
    await requestPermission();
  };

  return { fcmToken, getAndSendToken, onlyRequestPermission };
};
