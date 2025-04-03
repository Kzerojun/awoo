"use client";
import "@/app/globals.css";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import BottomBarWrapper from "@/common/ui/BottombarWrapper";
import ToastWrapper from "@/common/ui/ToastWrapper";
import { useTrackRouteChange } from "@/hooks/change-back/useTrackRouteChange";
import TrackRouteWrapper from "@/common/ui/TrackRouteWrapper";
// import AppInitializer from "@/hooks/user/AppInitializer";
import { KeypadProvider } from "@/contexts/KeypadContent"; // ✅ 키패드 컨텍스트
// FCM 관련 코드
import { useEffect } from "react";
import { useNotificationListener } from "@/hooks/alarm/useNotificationListner";
import { usePermissionObserver } from "@/hooks/alarm/usePermissionObserver";

export default function RootLayout({
  children,
  title,
  rightAction,
}: {
  children: React.ReactNode;
  title?: string;
  rightAction?: React.ReactNode;
}) {
  // === ✨ SW 등록 ===
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if (!navigator.serviceWorker.controller) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log("✅ Service Worker 등록 성공:", registration);
          })
          .catch((err) => {
            console.error("❌ Service Worker 등록 실패:", err);
          });
      } else {
        console.log("✅ 이미 Service Worker 등록됨");
      }
    }
  }, []);
  useNotificationListener(); // ✅ 알림 팝업 리스너는 앱 전체에 항상
  usePermissionObserver(); // ✅ 권한 변경 감지는 전역에서
  // 상단바가 표시될지 여부 결정
  const showTopBar = title || rightAction;

  return (
    <html lang="ko" className="h-screen">
      <body className="h-screen flex flex-col">
        <Providers>
          <KeypadProvider>
            {/* <AppInitializer /> */}
            <TrackRouteWrapper />
            <ToastWrapper />
            {/* 메인 컨텐츠 영역 */}
            <main className="flex-1 overflow-y-auto w-full min-h-screen pb-14 scrollbar-hide">
              {children}
            </main>

            {/* 하단바 (fixed bottom-0) */}
            <BottomBarWrapper />
          </KeypadProvider>
        </Providers>
      </body>
    </html>
  );
}
