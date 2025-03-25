"use client";

import { useEffect } from "react";
import { useUserInfo } from "./useUserInfo";
import { setUserData } from "@/lib/slices/userSlice";
import { useAppDispatch } from "@/lib/store";

const AppInitializer = () => {
  const { refetch: refetchUserInfo } = useUserInfo();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      refetchUserInfo().then(({ data }) => {
        if (data) {
          dispatch(setUserData(data));
        }
      });
    }
  }, []);

  return null;
};

export default AppInitializer;
