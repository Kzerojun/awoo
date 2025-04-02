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
import { useFCM } from "@/hooks/alarm/useFCM";

export default function RootLayout({
  children,
  title,
  rightAction,
}: {
  children: React.ReactNode;
  title?: string;
  rightAction?: React.ReactNode;
}) {
  const { fcmToken, permission } = useFCM(); // useFCM 훅 사용

  useEffect(() => {
    console.log("FCM 토큰:", fcmToken);
    console.log("알림 권한:", permission);
  }, [fcmToken, permission]);
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
