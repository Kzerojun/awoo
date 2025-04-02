"use client";
import { useEffect } from "react";
import { getToken, isSupported } from "firebase/messaging";
import { messaging } from "@/firebase-config";

const App = () => {
  useEffect(() => {
    registerServiceWorker();
    getFcmToken();
  }, []);

  // 서비스워커 등록
  const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("✅ Service Worker 등록 성공:", registration);
        })
        .catch((err) => {
          console.error("❌ Service Worker 등록 실패:", err);
        });
    }
  };

  // FCM 토큰 가져오기
  const getFcmToken = async () => {
    try {
      console.log("✅ VAPID KEY:", process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY);

      const supported = await isSupported();
      if (!supported) {
        console.warn("이 브라우저는 FCM을 지원하지 않음");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
        });
        console.log("✅ VAPID KEY:", process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY);
        console.log("[+] FCM Token:", token);
      } else {
        console.warn("알림 권한 거부됨");
      }
    } catch (error) {
      console.error("FCM 토큰 가져오기 실패:", error);
    }
  };

  return <div>FCM 테스트</div>;
};

export default App;
