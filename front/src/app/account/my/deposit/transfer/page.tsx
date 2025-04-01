"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { checkPasswordConfirm } from "@/lib/slices/userActionSlice";
import { useRouter } from "next/navigation";

const TransferPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const confirmPassword = useAppSelector((state) => state.userAction.checkPassword);

  // 비밀번호 확인 없이는 못 들어오게 처리
  // useEffect(() => {
  //   return () => {
  //     dispatch(checkPasswordConfirm(false));
  //   };
  // }, []);

  // useEffect(() => {
  //   if (confirmPassword === false) {
  //     alert("잘못된 접근입니다.");
  //     router.replace("/home");
  //   }
  // }, [confirmPassword, router]);

  // if (confirmPassword === false) {
  //   return null;
  // }
  return (
    <div>
      <CommonTopBar title="계좌 이체" rightAction="cancel" />
      <main className="mt-14 flex flex-col justify-center items-center"></main>
    </div>
  );
};

export default TransferPage;
