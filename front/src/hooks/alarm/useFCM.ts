import { useEffect, useState } from "react";
import { getToken, isSupported, onMessage } from "firebase/messaging";
import { messaging } from "@/firebase-config"; // FCM 초기화된 인스턴스

export const useFCM = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  // 알림 권한 요청 함수
  const requestNotificationPermission = async () => {
    const supported = await isSupported();
    if (!supported) {
      console.warn("이 브라우저는 FCM을 지원하지 않습니다.");
      return false;
    }

    const permission = await Notification.requestPermission();
    setPermission(permission); // 권한 상태 업데이트

    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");
      return true;
    } else {
      console.warn("알림 권한이 거부되었습니다.");
      return false;
    }
  };

  // FCM 토큰 요청 함수
  const getFcmTokenAndSave = async () => {
    try {
      const permissionGranted = await requestNotificationPermission();
      if (!permissionGranted) {
        return;
      }

      // FCM 토큰 가져오기
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
      });

      if (token) {
        console.log("FCM 토큰:", token);
        setFcmToken(token); // 상태에 토큰 저장
        localStorage.setItem("fcmToken", token); // 예시로 로컬스토리지에 저장
      } else {
        console.warn("FCM 토큰을 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("FCM 토큰 가져오기 실패:", error);
    }
  };

  // FCM 메시지 수신 리스너
  const listenForFCMMessages = () => {
    onMessage(messaging, (payload) => {
      console.log("🔥 Foreground FCM 수신:", payload);
      if (Notification.permission === "granted") {
        new Notification(payload.notification?.title || "새 알림", {
          body: payload.notification?.body || "",
          icon: "/logos/transfer_awoo.svg",
        });
      }
    });
  };

  // useEffect에서 초기화
  useEffect(() => {
    getFcmTokenAndSave(); // 컴포넌트 마운트 시 FCM 토큰 요청
    listenForFCMMessages(); // FCM 메시지 리스너 등록
  }, []);

  return { fcmToken, permission }; // 토큰과 권한 상태 반환
};
