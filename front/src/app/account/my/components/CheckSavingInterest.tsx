"use client";

import Button from "@/common/ui/Button";
import React from "react";

const CheckSavingInterest = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {/* 상단 설명 부분 */}

      <div className="w-full flex flex-col items-center justify-center gap-y-2 ">
        <span className="font-bold">적금 이자를 조회합니다.</span>

        <div className="text-center text-sm">
          중도 해지 예상일은 <span className="text-aqua font-bold">오늘</span>입니다.
        </div>
      </div>

      {/* 하단 조회 부분 */}
      <div className="w-full h-3/4 bg-gray-100 flex flex-col items-center justify-center gap-y-10">
        {/* 만기 해지 이자 조회 박스 */}
        <div className="w-[80%] border bg-white border-gray-700">
          <ul className="h-full space-y-3">
            <li className="bg-gray-200 text-sm px-2 py-1">이자 조회</li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>개설일</span>
              <span> 개설 날짜</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>만기일</span>
              <span> 만기 날짜</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>만기이자</span>
              <span> 만기이자 원</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>만기시 총 금액</span>
              <span> 만기 총금액 원</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
          </ul>
        </div>
        {/* 중도 해지 이자 조회 박스 */}
        <div className="w-[80%] border bg-white border-gray-700">
          <ul className="h-full space-y-3">
            <li className="bg-gray-200 text-sm px-2 py-1">중도 해지 이자 조회</li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>개설일</span>
              <span> 개설 날짜</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>해지 예상일</span>
              <span> 오늘날짜</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>해지 원금</span>
              <span> 원</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>중도해지시 금액</span>
              <span> 원</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
            <li className="px-2 flex justify-between items-center text-sm">
              <span>중도해지시 이자</span>
              <span> 원</span>
            </li>
            <li>
              <hr className="text-gray-200" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckSavingInterest;
