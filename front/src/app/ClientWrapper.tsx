"use client";

import "@/app/globals.css";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import BottomBarWrapper from "@/common/ui/BottombarWrapper";
import ToastWrapper from "@/common/ui/ToastWrapper";
import { useTrackRouteChange } from "@/hooks/change-back/useTrackRouteChange";
import TrackRouteWrapper from "@/common/ui/TrackRouteWrapper";
import AppInitializer from "@/hooks/user/AppInitializer";
import { KeypadProvider } from "@/contexts/KeypadContent"; // ✅ 키패드 컨텍스트
// FCM 관련 코드
import { useEffect } from "react";
import { useNotificationListener } from "@/hooks/alarm/useNotificationListner";
import { usePermissionObserver } from "@/hooks/alarm/usePermissionObserver";
import { usePathname } from "next/navigation";

export default function ClientWrapper({
  children,
  title,
  rightAction,
}: {
  children: React.ReactNode;
  title?: string;
  rightAction?: React.ReactNode;
}) {
  // children 의 현재 경로
  const path = usePathname();
  const isRootPath = path === "/";

  // 바텀바 숨김 페이지들
  const hideBottomBarPaths = [
    "/",
    "/#",
    "/login",
    "/my/profile/withdraw",
    "/signup",
    "/signup/policy",
    "/signup/profile",
    "/my/paymentRegister/signupDone",
    "/my/paymentRegister/paymentPassword",
    "/my/paymentRegister/accountCertificate",
    "/my/paymentRegister/registerDone",
    "/my/paymentSend/completeSend",
    "/my/paymentCharge/chargeDone",
    "/walk/pre",
    "/walk/start/guide",
    "/walk/start/walking", // 산책하는 페이지
    "/walk/take-photo", // 산책 후 사진 찍는 페이지
    "/walk/photo-check", // 사진 찍고 확인하는 페이지
    "/walk/end/check", // 산책 종료 페이지
    "/main", // 메인 웹페이지
    "/market/safePayment/safePayDone",
    "/market/safePayment/safePay",
    "/account/my/deposit/transfer", // 계좌이체 페이지
    "/account/my/check-password", // 계좌 조회 비밀번호 입력 페이지
  ];

  const shouldShowBottomBar = () => {
    const isMarketDetail = /^\/market\/[^\/]+$/.test(path);
    if (path.includes("/admin") || isMarketDetail) return false;
    return !hideBottomBarPaths.includes(path);
  };

  const showBottomBar = shouldShowBottomBar();

  // === ✨ SW 등록 ===
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // PWA용 SW 등록
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("✅ PWA 서비스워커 등록됨:", registration);
        })
        .catch((err) => {
          console.error("❌ PWA 서비스워커 등록 실패:", err);
        });

      // FCM용 SW 등록 (이미 있음)
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", {
          scope: "/firebase-cloud-messaging/",
        })
        .then((registration) => {
          console.log("✅ FCM 서비스워커 등록됨:", registration);
        })
        .catch((err) => {
          console.error("❌ FCM 서비스워커 등록 실패:", err);
        });
    }
  }, []);

  useNotificationListener(); // ✅ 알림 팝업 리스너는 앱 전체에 항상
  usePermissionObserver(); // ✅ 권한 변경 감지는 전역에서
  // 상단바가 표시될지 여부 결정
  const showTopBar = title || rightAction;

  return (
        <Providers>
          <KeypadProvider>
            {!isRootPath ? <AppInitializer /> : null}
            {!isRootPath ? <TrackRouteWrapper /> : null}
            <ToastWrapper />
            {/* 메인 컨텐츠 영역 */}
            <main
              className={`flex-1 overflow-y-auto w-full scrollbar-hide ${
                showBottomBar ? "pb-14" : ""
              }`}
            >
              {children}
            </main>
        {/* 하단바 (fixed bottom-0) */}
        {showBottomBar && <BottomBarWrapper />}
      </KeypadProvider>
    </Providers>
  );
}
