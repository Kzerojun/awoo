"use client";

// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  popPath,
  markGoingBack,
  changeCurrentManageDepositView,
  changeCurrentManageSavingView,
} from "@/lib/slices/userActionSlice";
import React from "react";
import { changeTransferData, clearTransferData } from "@/lib/slices/transferSlice";

interface CommonTopBarProps {
  title: string;
  leftAction?: "back" | "close" | "transferBack" | "depositManageBack" | "savingManageBack";
  rightAction?: "bell" | "none" | "cancel" | "setting" | "close";
  backColor?: "white" | "aqua" | "green";
  textColor?: "white" | "black";
  transferStep?: number;
  currentManageDepositView?: number;
  currentManageSavingView?: number;
  onClose?: () => void;
  onBellClick?: () => void;
  onSettingClick?: () => void;
  backUrl?: string; // 정보 보존을 위해 라우팅 url
}

const CommonTopBar = ({
  title,
  leftAction = "back",
  rightAction = "none",
  backColor = "white",
  textColor = "black",
  transferStep = 1,
  currentManageDepositView = 1,
  currentManageSavingView = 1,
  onClose,
  onBellClick,
  onSettingClick,
  backUrl,
}: CommonTopBarProps) => {
  interface leftActionTypes {
    back: React.ReactNode;
    close: React.ReactNode;
    transferBack: React.ReactNode;
    depositManageBack: React.ReactNode;
    savingManageBack: React.ReactNode;
  }

  interface rightActionTypes {
    bell: React.ReactNode;
    none: null;
    cancel: React.ReactNode;
    close: React.ReactNode;
    setting: React.ReactNode;
  }

  interface backColorTypes {
    white: string;
    aqua: string;
    green: string;
  }

  interface textColorTypes {
    white: string;
    black: string;
  }

  const leftActionTypes: leftActionTypes = {
    back: <ChevronLeftIcon className="h-6 w-6" />,
    close: <XMarkIcon className="h-6 w-6" />,
    transferBack: <span className="text-sm ">이전</span>,
    depositManageBack: <span className="text-sm ">이전</span>,
    savingManageBack: <span className="text-sm ">이전</span>,
  };

  const rightActionTypes: rightActionTypes = {
    bell: <BellIcon className="h-6 w-6" />,
    none: null,
    cancel: <span className="text-sm ">취소</span>,
    close: <XMarkIcon className="h-6 w-6" />,
    setting: <Cog6ToothIcon className="h-6 w-6" />,
  };

  const backColorTypes: backColorTypes = {
    white: "bg-white",
    aqua: "bg-aqua",
    green: "bg-green",
  };

  const textColorTypes: textColorTypes = {
    white: "text-white",
    black: "text-black",
  };

  const router = useRouter();
  const dispatch = useAppDispatch();
  const historyStack = useAppSelector((state) => state.userAction.historyStack);

  const handleLeftClick = () => {
    // 뒤로가기
    if (leftAction === "back") {
      if (backUrl) {
        // backUrl 이 명시되었으면 가장 우선 사용
        router.push(backUrl);
      } else if (historyStack.length > 0) {
        // 명시되지 않은 경우 기존 로직
        const prevPath = historyStack[historyStack.length - 1];
        dispatch(markGoingBack(true));
        dispatch(popPath());
        router.push(prevPath);
      } else {
        router.back();
      }
    } else if (leftAction === "close") {
      if (onClose) {
        onClose(); // 모달용 콜백
      } else {
        router.back(); // ✅ 일반 페이지에서는 그냥 뒤로가기
      }
      // 계좌이체 커스텀
    } else if (leftAction === "transferBack") {
      if (transferStep > 1) {
        dispatch(changeTransferData({ transferStep: transferStep - 1 }));
      } else if (transferStep === 1) {
        router.back();
      }
      // 내부 계좌 관리 커스텀
    } else if (leftAction === "depositManageBack") {
      if (currentManageDepositView > 1) {
        dispatch(changeCurrentManageDepositView(1));
      } else if (currentManageDepositView === 1) {
        router.back();
      }
      // 적금 관리 커스텀
    } else if (leftAction === "savingManageBack") {
      if (currentManageSavingView > 1) {
        dispatch(changeCurrentManageSavingView(1));
      } else if (currentManageSavingView === 1) {
        router.back();
      }
    }
    // bell 등 다른 경우는 아직 미사용
  };

  // 오른쪽 액션
  const handleRightClick = () => {
    // 취소
    if (rightAction == "cancel" && onClose) {
      onClose();
    }
    // 세팅
    else if (rightAction === "setting" && onSettingClick) {
      onSettingClick();
    }
    // 알림
    else if (rightAction === "bell" && onBellClick) {
      onBellClick();
    }
    // 닫기
    else if (rightAction === "close") {
      if (leftAction === "transferBack") {
        dispatch(clearTransferData());
        router.push("/home");
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-14 ${backColorTypes[backColor]} flex items-center px-4 justify-between z-50`}
    >
      {/* 왼쪽 버튼 */}

      <button onClick={handleLeftClick} className={`${textColorTypes[textColor]}`}>
        {leftActionTypes[leftAction]}
      </button>

      {/* 중앙 제목 title 필수 */}
      {title && (
        <h1
          className={`absolute left-1/2 transform -translate-x-1/2 text-lg font-medium ${textColorTypes[textColor]} leading-tight`}
        >
          {title}
        </h1>
      )}

      {/* 우측 버튼 */}
      <button onClick={handleRightClick} className={`${textColorTypes[textColor]}`}>
        {rightActionTypes[rightAction]}
      </button>
    </header>
  );
};

export default CommonTopBar;
