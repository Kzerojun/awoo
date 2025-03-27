"use client";

// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { popPath, markGoingBack } from "@/lib/slices/userActionSlice";
import React from "react";

interface CommonTopBarProps {
  title: string;
  leftAction?: "back" | "close";
  rightAction?: "bell" | "none" | "cancel" | "setting";
  backColor?: "white" | "aqua";
  onClose?: () => void;
  onBellClick?: () => void;
  onSettingClick?: () => void;
}

const CommonTopBar = ({
  title,
  leftAction = "back",
  rightAction = "none",
  backColor = "white",
  onClose,
  onBellClick,
  onSettingClick,
}: CommonTopBarProps) => {
  interface leftActionTypes {
    back: React.ReactNode;
    close: React.ReactNode;
  }

  interface rightActionTypes {
    bell: React.ReactNode;
    none: null;
    cancel: React.ReactNode;
    setting: React.ReactNode;
  }

  interface backColorTypes {
    white: string;
    aqua: string;
  }

  const leftActionTypes: leftActionTypes = {
    back: <ChevronLeftIcon className="h-6 w-6" />,
    close: <XMarkIcon className="h-6 w-6" />,
  };

  const rightActionTypes: rightActionTypes = {
    bell: <BellIcon className="h-6 w-6" />,
    none: null,
    cancel: <span className="text-sm ">취소</span>,
    setting: <Cog6ToothIcon className="h-6 w-6 text-black" />,
  };

  const backColorTypes: backColorTypes = {
    white: "bg-white",
    aqua: "bg-aqua",
  };

  const router = useRouter();
  const dispatch = useAppDispatch();
  const historyStack = useAppSelector((state) => state.userAction.historyStack);

  const handleLeftClick = () => {
    // 뒤로가기
    if (leftAction === "back") {
      if (historyStack.length > 0) {
        const prevPath = historyStack[historyStack.length - 1];
        dispatch(markGoingBack(true));
        dispatch(popPath());
        router.push(prevPath);
      } else {
        router.back();
      }
    } else if (leftAction === "close") {
      if (onClose) {
        // 모달 닫고 페이지 이동 처리 등
        onClose();
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
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-14 ${backColorTypes[backColor]} flex items-center px-4 justify-between z-50`}
    >
      {/* 왼쪽 버튼 */}

      <button onClick={handleLeftClick} className="text-gray-500">
        {leftActionTypes[leftAction]}
      </button>

      {/* 중앙 제목 title 필수 */}
      {title && (
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium text-custom-black leading-tight">
          {title}
        </h1>
      )}

      {/* 우측 버튼 */}
      <button onClick={handleRightClick}>{rightActionTypes[rightAction]}</button>
    </header>
  );
};

export default CommonTopBar;
