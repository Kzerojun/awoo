import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/firebase-config";

export const useNotificationListener = () => {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("🔥 Foreground FCM 수신:", payload);
      if (Notification.permission === "granted") {
        new Notification(payload.notification?.title || "새 알림", {
          body: payload.notification?.body || "",
          icon: "/logos/transfer_awoo.svg",
        });
      }
    });

    return () => unsubscribe();
  }, []);
};
