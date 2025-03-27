"use client";

import { useState } from "react";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import Button from "@/common/ui/Button";

interface DetailBottomBarProps {
  price: string;
  onChatClick: () => void;
}

export default function DetailBottomBar({ price, onChatClick }: DetailBottomBarProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-3 z-50">
      <div className="flex items-center justify-between">
        {/* 💖 찜 + 가격 묶음 */}
        <div className="flex items-center gap-2">
          <button onClick={() => setLiked(!liked)} className="mr-4 ml-2">
            {liked ? (
              <SolidHeart className="w-6 h-6 text-rose-500" />
            ) : (
              <OutlineHeart className="w-6 h-6 text-gray-400" />
            )}
          </button>
          <div className="text-lg font-bold text-gray-900">{price}</div>
        </div>

        {/* 💬 채팅하기 버튼 (공통 컴포넌트 사용) */}
        <Button
          text="채팅하기"
          fontBold="base"
          textSize="small"
          backgroundColor="aqua"
          fontColor="white"
          width="short"
          onClick={onChatClick}
        />
      </div>
    </div>
  );
}
