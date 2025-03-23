"use client";
import { useEffect, useState } from "react";

const reviews = [
  { text: "멍페이랑 자동 연결돼서 결제할 때 진짜 편했어요!", user: "dani***en" },
  { text: "적금이랑 바로 연결되니까 따로 이체 안 해도 돼서 좋아요.", user: "pupp***mom" },
  { text: "AwoO 통장 하나로 서비스 전부 연결되는 게 최고!", user: "dogl***ve" },
];

export default function SimpleReviewSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 px-4 max-w-md mx-auto transition-all duration-500">
      <h2 className="text-base font-semibold mb-4">AwOO 유저들의 후기</h2>
      <div className="bg-white p-5 rounded-xl shadow-md text-sm text-gray-800 leading-relaxed transition-opacity duration-500">
        “{reviews[current].text}”
        <p className="text-xs text-gray-400 italic mt-2">- {reviews[current].user}</p>
      </div>
    </div>
  );
}
