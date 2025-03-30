"use client";

import { useState } from "react";
import ChatFilterTabs from "../chat/components/ChatFilterTabs";
import ChatListItem from "../chat/components/ChatListItem";

// 더미 데이터
const dummyChatList = [
  {
    roomId: "1",
    partnerNickname: "멍페이",
    partnerProfileImage: "/images/awoopay.png",
    lastMessage: "개인정보 이용내역 및 수집 동의 안내",
    lastMessageTime: "4분 전",
    unreadCount: 0,
    type: "notice", // 공지 채팅
  },
  {
    roomId: "2",
    partnerNickname: "웨이드",
    partnerProfileImage: "/images/wade.png",
    lastMessage: "아 안녕하세용",
    lastMessageTime: "4분 전",
    unreadCount: 3,
    type: "normal",
  },
];

export default function ChatList() {
  const [currentTab, setCurrentTab] = useState<"전체" | "판매" | "구매" | "안 읽은 채팅방">("전체");

  // 실제로는 필터링 필요
  const filteredList = dummyChatList;

  return (
    <div className="flex flex-col space-y-4">
      {/* 채팅 탭 */}
      <ChatFilterTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* 채팅 목록 */}
      <div className="space-y-2">
        {filteredList.map((chat) => (
          <ChatListItem key={chat.roomId} chat={chat} />
        ))}
      </div>
    </div>
  );
}
