"use client";
import React from "react";
interface InfoCardProps {
  title: string;
  description: string;
  iconSrc?: string;
}

export default function InfoCard({ title, description, iconSrc }: InfoCardProps) {
  return (
    <div className="p-4 py-6 bg-light-aqua rounded-lg shadow flex justify-between items-center">
      {/* 텍스트 영역 (왼쪽 정렬) */}
      <div className="text-left">
        <h2 className="text-m font-semibold">{title}</h2>
        <p className="text-xs text-custom-gray">{description}</p>
      </div>

      {/* 오른쪽 아이콘 (정렬 맞춤) */}
      {iconSrc && (
        <div className="flex justify-end items-end">
          <img src={iconSrc} alt={title} className="w-16 h-16" />
        </div>
      )}
    </div>
  );
}
