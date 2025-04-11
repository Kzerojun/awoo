"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store";
import axiosInstance from "@/api/axiosInstance";

interface WalkSummary {
  petId: number;
  petName: string;
  savingGrade?: string;
  walkCount: number;
  totalMinutes: number;
}

export default function WalkPostitCarousel() {
  const pets = useAppSelector((state) => state.pet.petList);
  const [summaries, setSummaries] = useState<WalkSummary[]>([]);
  const [current, setCurrent] = useState(0);

  // 슬라이드 인덱스 자동 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % summaries.length);
    }, 4000); // 4초마다

    return () => clearInterval(interval);
  }, [summaries]);

  // 데이터 가져오기
  useEffect(() => {
    const fetchAll = async () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();

      const results: WalkSummary[] = await Promise.all(
        pets.map(async (pet) => {
          try {
            const res = await axiosInstance.get(`/pets/${pet.petId}/walks/inMonth`);
            const walks = res.data.response.walks || [];

            const filtered = walks.filter((w: any) => {
              const date = new Date(w.startTime);
              return date.getFullYear() === year && date.getMonth() === month;
            });

            const totalMinutes = filtered.reduce((acc: number, walk: any) => {
              const start = new Date(walk.startTime);
              const end = new Date(walk.endTime);
              return acc + (end.getTime() - start.getTime()) / 1000 / 60;
            }, 0);

            return {
              petId: pet.petId,
              petName: pet.name,
              savingGrade: pet.savingId ? pet.savingGrade : undefined,
              walkCount: filtered.length,
              totalMinutes: Math.round(totalMinutes),
            };
          } catch (err) {
            return {
              petId: pet.petId,
              petName: pet.name,
              savingGrade: pet.savingId ? pet.savingGrade : undefined,
              walkCount: 0,
              totalMinutes: 0,
            };
          }
        })
      );

      setSummaries(results);
    };

    if (pets.length > 0) fetchAll();
  }, [pets]);

  return (
    <div className="rounded-lg shadow ">
      {" "}
      {/* 외부 패딩만 */}
      <div className="relative overflow-hidden h-[270px]">
        {" "}
        {/* 슬라이더 영역 */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
            width: `${summaries.length * 100}%`,
          }}
        >
          {summaries.map((summary) => (
            <div key={summary.petId} className="min-w-full flex-shrink-0">
              {" "}
              {/* ✅ 핵심 수정 */}
              <div className="bg-yellow-100 rounded-xl px-6 py-6 shadow-md h-[270px] w-full">
                <div className="text-xs text-gray-500 mb-1">
                  {new Date().toLocaleString("ko-KR", { year: "numeric", month: "long" })} 기준
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  🐶 {summary.petName} 산책 리포트
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  🐾 <span className="text-base font-semibold">{summary.walkCount}회</span>{" "}
                  산책했어요!
                  {"\n"}🕒 총{" "}
                  <span className="font-semibold">
                    {Math.floor(summary.totalMinutes / 60)}시간 {summary.totalMinutes % 60}분
                  </span>{" "}
                  걸었어요!
                  {summary.savingGrade && (
                    <>
                      {"\n"}💰 현재 <span className="font-medium">{summary.savingGrade}</span> 적금
                      도전 중이에요!
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
