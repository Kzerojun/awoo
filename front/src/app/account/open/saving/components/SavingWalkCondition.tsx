"use client";
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // solid 스타일도 있음

const SavingWalkCondition = () => {
  const conditions = [
    "한 달 기준 20일 이상 산책 성공",
    "1회 산책 시 30분 이상 & 1.5km 이상",
    "매일 기준 충족 시 1점, 월 20점 이상이면 성공",
    "한 달이라도 실패하면 해당 단계는 종료",
    "성공 시에만 다음 단계 적금에 도전 가능",
  ];

  return (
    <div className="bg-[#f9fafb] p-5 rounded-xl border border-gray-200 shadow-sm mt-6">
      <h3 className="text-base font-bold text-gray-800 flex items-center gap-1 mb-4">
        <span className="text-aqua text-lg">🐾</span>
        산책 성공 조건
      </h3>

      <ul className="space-y-3">
        {conditions.map((text, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
            <CheckCircleIcon className="w-5 h-5 text-aqua mt-0.5" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavingWalkCondition;
