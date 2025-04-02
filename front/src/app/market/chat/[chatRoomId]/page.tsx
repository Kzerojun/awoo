"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { chatSocket } from "@/socket/chatSocket";
import ChatRoomHeader from "../../chat/components/ChatRoomHeader";
import ChatMessageBubble from "../../chat/components/ChatMessagaBubble";
import ChatInputBox from "../../chat/components/ChatInputBox";
import PaymentSelectModal from "../../chat/components/PaymentSelectModal";
import type { IMessage } from "@stomp/stompjs";
import axiosInstance from "@/api/axiosInstance";
import { useAppSelector } from "@/lib/store";

interface MessageType {
  messageId: number;
  senderId: number;
  message: string;
  createdAt: string;
  image: string | null;
  chatRoomId: number;
}

export default function ChatRoomPage() {
  const { chatRoomId } = useParams() as { chatRoomId: string };
  const searchParams = useSearchParams();
  const usedProductId = searchParams.get("usedProductId");

  const [showActions, setShowActions] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const memberId = useAppSelector((state) => state.memberId.memberId); // ✅ 내 memberId
  const scrollRef = useRef<HTMLDivElement>(null); // ✅ 스크롤용 ref

  // ✅ 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ 메시지 가져오기 + 소켓 연결
  useEffect(() => {
    if (!memberId || memberId === 0) return;
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const fetchMessagesAndConnect = async () => {
      try {
        const res = await axiosInstance.get(`/used-products/chat-rooms/${chatRoomId}`);
        const pastMessages: MessageType[] = res.data.response.chatMessages.map((msg: any) => ({
          messageId: msg.messageId,
          senderId: msg.senderId,
          message: msg.message,
          createdAt: msg.createdAt,
          image: msg.image,
          chatRoomId: Number(chatRoomId),
        }));

        setMessages(pastMessages);

        chatSocket.connect(token, Number(chatRoomId), (message: IMessage) => {
          const body = JSON.parse(message.body);
          const fixedMessage: MessageType = {
            messageId: Date.now(),
            senderId: body.senderId ?? 0,
            message: body.message ?? "",
            createdAt: body.createdAt ?? new Date().toISOString(),
            image: body.image ?? null,
            chatRoomId: Number(chatRoomId),
          };
          setMessages((prev) => {
            const newMessages = [...prev, fixedMessage];
            return newMessages.sort(
              (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          });
        });
      } catch (error) {
        console.error("채팅 기록 불러오기 실패", error);
      }
    };

    fetchMessagesAndConnect();

    return () => {
      chatSocket.disconnect();
    };
  }, [chatRoomId, memberId]);

  // ✅ 채팅 전송
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    chatSocket.send(Number(chatRoomId), text, memberId);
  };

  // ✅ 렌더링
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatRoomHeader usedProductId={usedProductId ? Number(usedProductId) : null} />

      {/* 채팅 내용 (스크롤 영역) */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <ChatMessageBubble
              key={msg.messageId}
              sender={Number(msg.senderId) === Number(memberId) ? "me" : "partner"}
              content={msg.message}
              time={msg.createdAt}
              image={msg.image}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            아직 채팅이 없습니다.
          </div>
        )}
      </div>

      {/* 입력창 + 액션 버튼 고정 */}
      <div className="sticky bottom-0 bg-white flex flex-col">
        <ChatInputBox
          onToggleActions={() => setShowActions(!showActions)}
          onSendMessage={handleSendMessage}
        />

        {showActions && (
          <div className="w-full bg-white py-4 flex justify-around border-t">
            {[
              { label: "앨범", icon: "🖼️" },
              { label: "카메라", icon: "📷" },
              { label: "송금", icon: "💸" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center space-y-1 cursor-pointer"
                onClick={() => {
                  if (item.label === "송금") {
                    setShowPaymentModal(true);
                    setShowActions(false);
                  }
                }}
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <span className="text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 송금 모달 */}
      <PaymentSelectModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
    </div>
  );
}
