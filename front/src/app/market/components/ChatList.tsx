"use client";

import { useState, useEffect } from "react";
import ChatFilterTabs from "../chat/components/ChatFilterTabs";
import ChatListItem from "../chat/components/ChatListItem";
import axiosInstance from "@/api/axiosInstance";

interface ChatRoomType {
  chatRoomId: number;
  usedProductId: number | null;
  latestMessage: string | null;
  latestMessageCreatedAt: string | null;
  sellerNickname: string;
}

export default function ChatList() {
  const [currentTab, setCurrentTab] = useState<"전체" | "판매" | "구매" | "안 읽은 채팅방">("전체");
  const [chatList, setChatList] = useState<ChatRoomType[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const res = await axiosInstance.get("/used-products/chat-rooms");
        setChatList(res.data.response.chatRooms);
      } catch (error) {
        console.error("채팅방 목록 가져오기 실패", error);
      }
    };

    fetchChatRooms();
  }, []);

  // 메시지 없는 채팅방 제거
  const filteredList = chatList.filter((chat) => chat.latestMessage !== null);

  return (
    <div className="flex flex-col space-y-4">
      <ChatFilterTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="space-y-2">
        {filteredList.map((chat, index) => (
          <ChatListItem
            key={chat.chatRoomId}
            chat={{
              roomId: chat.chatRoomId.toString(),
              partnerNickname: chat.sellerNickname,
              partnerProfileImage: "/images/avatars/basic.jpg", // FIXME: 임시
              lastMessage: chat.latestMessage ?? "메시지가 없습니다",
              lastMessageTime: chat.latestMessageCreatedAt ?? "",
              unreadCount: 0, // FIXME: 추후 처리
              type: "normal",
              usedProductId: chat.usedProductId,
            }}
            hasBorder={index !== filteredList.length - 1} // ✅ 마지막 채팅방 border 제거
          />
        ))}
      </div>
    </div>
  );
}
