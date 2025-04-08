"use client";

import { useEffect } from "react";
import { useUserInfo } from "./useUserInfo";
import { setUserData } from "@/lib/slices/userSlice";
import { useAppDispatch } from "@/lib/store";
import { useRouter, usePathname } from "next/navigation";

const AppInitializer = () => {
  const { refetch: refetchUserInfo, isSuccess, isError } = useUserInfo();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      refetchUserInfo()
        .then(({ data }) => {
          console.log("이니셜라이저 실행");
          if (data) {
            dispatch(setUserData(data));
            router.replace("/home");
          }
        })
        .catch((err) => {
          console.error("자동 로그인 시 유저 정보 가져오기 실패: ", err);
          alert("로그아웃 되었습니다. \n 다시 로그인해주세요.");
          localStorage.removeItem("accessToken");
          router.replace("/login");
        });
    } else {
      router.replace("/login");
    }
  }, []);

  return null;
};

export default AppInitializer;
