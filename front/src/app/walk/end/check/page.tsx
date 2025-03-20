"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";

const EndCheckPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 산책 데이터
  const startTime = useAppSelector((state) => state.walk.startTime);
  const endTime = useAppSelector((state) => state.walk.endTime);
  const totalTime = useAppSelector((state) => state.walk.totalTime);
  const distance = useAppSelector((state) => state.walk.distance);
  const image = useAppSelector((state) => state.walk.photo);

  return (
    <>
      <div>
        <h1>산책이 종료</h1>
        <p>산책이 기록되었습니다!</p>
      </div>
      {/* 산책 데이터 */}
      <div>
        <span>
          <div>총 산책 시간</div>
          <p>{totalTime}</p>
        </span>
        <span>
          <div>총 산책 거리</div>
          <p>{distance}</p>
        </span>
      </div>
    </>
  );
};

export default EndCheckPage;
