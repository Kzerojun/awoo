"use client";

import CommonTopBar from "@/common/ui/CommonTopBar";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { checkPasswordConfirm } from "@/lib/slices/userActionSlice";
import { useRouter } from "next/navigation";
import TransferStep1 from "../../components/TransferStep1";
import TransferStep2 from "../../components/TransferStep2";
import TransferStep3 from "../../components/TransferStep3";
import TransferStep4 from "../../components/TransferStep4";
import WalkingLoading from "@/app/walk/components/WalkingLoading";

const TransferPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const confirmPassword = useAppSelector((state) => state.userAction.checkPassword);
  const transferStep = useAppSelector((state) => state.transfer.transferStep);

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

  const TransferStepComponent = {
    1: <TransferStep1 />,
    2: <TransferStep2 />,
    3: <TransferStep3 />,
    4: <TransferStep4 />,
  }[transferStep] || <WalkingLoading />;

  return (
    <div>
      {transferStep !== 4 && <CommonTopBar title="계좌 이체" rightAction="cancel" />}
      <main className="mt-14 flex flex-col justify-center items-center">
        {TransferStepComponent}
      </main>
    </div>
  );
};

export default TransferPage;
