"use client";

import React from "react";
import { useAppSelector } from "@/lib/store";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/lib/store";
import { changeCurrentManageSavingView } from "@/lib/slices/userActionSlice";
const SavingManageBottom = () => {
  const dispatch = useAppDispatch();

  const changeCurrentViewCheck = () => {
    dispatch(changeCurrentManageSavingView(2));
  };

  const changeCurrentViewDelete = () => {
    dispatch(changeCurrentManageSavingView(3));
  };

  return (
    <div className="w-full flex flex-col items-start justify-center">
      {/* 탭 */}
      <div className="w-full text-xs bg-gray-100 py-1 px-4 text-gray-500">설정</div>
      <ul className="w-full py-1 px-4 text-sm">
        <li
          className="py-4 border-b border-gray-200 flex justify-between items-center"
          onClick={changeCurrentViewCheck}
        >
          <span>이자 조회</span>
          <span>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          </span>
        </li>
        <li
          className="py-4 border-b border-gray-200 flex justify-between items-center"
          onClick={changeCurrentViewDelete}
        >
          <span className="text-gray-400">적금 해지</span>
          <span>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SavingManageBottom;
