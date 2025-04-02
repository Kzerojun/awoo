"use client";
import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "@/firebase-config";

const App = () => {
  useEffect(() => {
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
        });

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
