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
  name: string;
  memberProfileImage: string;
}

export default function ChatList() {
  const [chatList, setChatList] = useState<ChatRoomType[]>([]);
  const getDisplayMessage = (msg: string): string => {
    const systemMessages: { [key: string]: string } = {
      SAFE_FINISH: "안심결제 관련 메시지",
      PAYMENT_FINISH: "일반결제 관련 메시지",
      SAFE_INFO_SUBMITTED: "안심결제 관련 메시지",
      SAFE_COMPLETE: "안심결제 관련 메시지",
    };

    return systemMessages[msg] || msg;
  };

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
  const filteredList = chatList
    .filter((chat) => chat.latestMessage !== null)
    .sort((a, b) => {
      const timeA = new Date(a.latestMessageCreatedAt ?? "").getTime();
      const timeB = new Date(b.latestMessageCreatedAt ?? "").getTime();
      return timeB - timeA; // 최신순
    });

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        {filteredList.map((chat, index) => (
          <ChatListItem
            key={chat.chatRoomId}
            chat={{
              roomId: chat.chatRoomId.toString(),
              name: chat.name,
              memberProfileImage: chat.memberProfileImage, // FIXME: 임시
              lastMessage: getDisplayMessage(chat.latestMessage ?? "메시지가 없습니다"),
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
