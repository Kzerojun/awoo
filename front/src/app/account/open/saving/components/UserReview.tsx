"use client";

import { useEffect, useState } from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";

interface Review {
  text: string;
  user: string;
}

interface WalkDepositReviewProps {
  reviews: Review[];
}

export default function WalkDepositReview({ reviews }: WalkDepositReviewProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className="mt-12 px-4 max-w-md mx-auto transition-all duration-500">
      <h2 className="text-base text-center font-semibold mb-4 flex items-center justify-center gap-2">
        산책 적금 유저들의 후기
        <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-aqua" />
      </h2>
      <div className="bg-white p-5 rounded-xl shadow-md text-sm text-gray-800 leading-relaxed transition-opacity duration-500 min-h-[100px] flex flex-col justify-between">
        <p>“{reviews[current].text}”</p>
        <div className="mt-2 text-xs text-gray-400 italic text-right">
          - {reviews[current].user}
        </div>
      </div>
    </div>
  );
}
