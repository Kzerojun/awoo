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
    const supported = await isSupported();
    if (!supported) {
      console.warn("❌ [FCM] 현재 브라우저는 FCM을 지원하지 않습니다.");
      return;
    }

    // ✅ 이미 권한이 허용되어 있는지 확인
    let permissionGranted = Notification.permission === "granted";

    // ❗️ 허용되어 있지 않다면 권한 요청
    if (!permissionGranted) {
      const permission = await Notification.requestPermission();
      permissionGranted = permission === "granted";

      if (!permissionGranted) {
        console.warn("❌ [FCM] 알림 권한이 거부되었습니다.");
        return;
      }
    }

    // ✅ 서비스 워커가 준비될 때까지 대기
    const swRegistration = await navigator.serviceWorker.ready;

    // ✅ FCM 토큰 발급 요청 (서비스워커 명시적으로 넘김)
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });

    if (!token) {
      console.warn("❌ [FCM] 토큰을 가져오지 못했습니다.");
      return;
    }

    // ✅ 서버로 토큰 전송 & 로컬스토리지 저장
    try {
      console.log("✅ VAPID KEY:", process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY);
      console.log("🚀 [FCM] 토큰 서버 전송:", token);
      await axiosInstance.post("/alarms/tokens", { token });
      localStorage.setItem("fcmToken", token);
      setFcmToken(token);
    } catch (err) {
      console.error("❌ [FCM] 토큰 서버 전송 실패:", err);
    }
  };

  // ✅ 앱 진입시 토큰만 검사 & 갱신용
  const checkAndUpdateToken = async () => {
    const permissionGranted = await requestPermission();
    if (!permissionGranted) return;
    const swRegistration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration, // ✅ 명시적으로 넘김
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
