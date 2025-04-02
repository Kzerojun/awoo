"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { chatSocket } from "@/socket/chatSocket";
import ChatRoomHeader from "../../chat/components/ChatRoomHeader";
import ChatMessageBubble from "../../chat/components/ChatMessagaBubble";
import ChatInputBox from "../../chat/components/ChatInputBox";
import PaymentSelectModal from "../../chat/components/PaymentSelectModal";
import type { IMessage } from "@stomp/stompjs";

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
  const [showActions, setShowActions] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const searchParams = useSearchParams();
  const usedProductId = searchParams.get("usedProductId");
  // --------------------------
  // ✅ 과거 메시지 + 소켓 연결
  // --------------------------
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    // 소켓 연결 + 구독 + 실시간 메세지 핸들링
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
      setMessages((prev) => [...prev, fixedMessage]);
    });

    return () => {
      chatSocket.disconnect();
    };
  }, [chatRoomId]);

  // --------------------------
  // ✅ 채팅 전송
  // --------------------------
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    chatSocket.send(Number(chatRoomId), text);
  };

  // --------------------------
  // ✅ Render
  // --------------------------
  return (
    <div className="flex flex-col h-screen bg-gray-50 relative">
      <ChatRoomHeader usedProductId={usedProductId ? Number(usedProductId) : null} />

      {/* 채팅 내용 */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.length > 0 ? (
          messages.map((msg) => {
            console.log("렌더링 대상", msg);
            return (
              <ChatMessageBubble
                key={msg.messageId}
                sender={msg.senderId === 123 ? "me" : "partner"} // FIXME: 나중에 내 id 비교
                content={msg.message}
                time={msg.createdAt}
                image={msg.image}
              />
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            아직 채팅이 없습니다.
          </div>
        )}
      </div>

      {/* 입력창 */}
      <div className="sticky bottom-0 bg-white">
        <ChatInputBox
          onToggleActions={() => setShowActions(!showActions)}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* 액션 버튼 */}
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

      {/* 송금 모달 */}
      <PaymentSelectModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
    </div>
  );
}
