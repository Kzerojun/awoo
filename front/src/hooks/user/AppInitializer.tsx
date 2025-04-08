"use client";

import { useEffect } from "react";
import { useUserInfo } from "./useUserInfo";
import { setUserData } from "@/lib/slices/userSlice";
import { useAppDispatch } from "@/lib/store";
import { useRouter, usePathname } from "next/navigation";
import { useFCMToken } from "../alarm/useFCM";

const AppInitializer = () => {
  const { refetch: refetchUserInfo, isSuccess, isError } = useUserInfo();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { getAndSendToken } = useFCMToken();

  useEffect(() => {
    // ✅ PWA 정적 파일 요청 시 return (리다이렉트 방지)
    const isPwaAsset =
      pathname.startsWith("/_next") ||
      pathname === "/sw.js" ||
      pathname === "/manifest.json" ||
      pathname === "/firebase-messaging-sw.js";

    if (isPwaAsset) return;
    if (pathname !== "/") return;
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      refetchUserInfo()
        .then(async ({ data }) => {
          console.log("이니셜라이저 실행");
          if (data) {
            dispatch(setUserData(data));
            await getAndSendToken(); // FCM 토큰 갱신 추가
            router.replace("/home");
          }
        })
        .catch((err) => {
          console.error("자동 로그인 시 유저 정보 가져오기 실패: ", err);
          alert("로그아웃 되었습니다. \n 다시 로그인해주세요.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("fcmToken"); // ✅ 자동 로그인 실패 시도 시 토큰도 지워줌
          router.replace("/login");
        });
    } else {
      localStorage.removeItem("fcmToken");
      router.replace("/login");
    }
  }, []);

  return null;
};

export default AppInitializer;
