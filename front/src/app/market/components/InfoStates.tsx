"use client";

import { EyeIcon, ChatBubbleLeftEllipsisIcon, HeartIcon } from "@heroicons/react/24/outline";

interface InfoStatsProps {
  views: number;
  chat: number;
  likes: number;
}

export default function InfoStats({ views, chat, likes }: InfoStatsProps) {
  return (
    <div className="flex justify-start items-center text-xs text-gray-400 gap-4 px-4 pb-4">
      <span className="flex items-center gap-1">
        <EyeIcon className="w-4 h-4" />
        {views}
      </span>
      <span className="flex items-center gap-1">
        <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
        {chat}
      </span>
      <span className="flex items-center gap-1">
        <HeartIcon className="w-4 h-4" />
        {likes}
      </span>
    </div>
  );
}
