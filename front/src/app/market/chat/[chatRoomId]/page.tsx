"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { chatSocket } from "@/socket/chatSocket";
import ChatRoomHeader from "../../chat/components/ChatRoomHeader";
import ChatMessageBubble from "../components/ChatMessagaBubble";
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
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const memberId = useAppSelector((state) => state.memberId.memberId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // 스크롤 자동 내리기
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 메시지 가져오기 + 소켓 연결
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
          setMessages((prev) => [...prev, fixedMessage]);
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

  // 채팅 전송
  const handleSendMessage = (text: string) => {
    if (!text.trim() && selectedImages.length === 0) return;
    console.log("보낼 텍스트:", text);
    console.log("보낼 이미지:", selectedImages);
    setSelectedImages([]);
  };

  // 이미지 선택
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...newImages]);
    setShowActions(false);
  };

  // 이미지 제거
  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 송금 모달
  const handleSendMoneyClick = () => {
    setShowActions(false);
    setShowPaymentModal(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 relative">
      <ChatRoomHeader usedProductId={usedProductId ? Number(usedProductId) : null} />

      {/* 채팅 내용 */}
      <div ref={scrollRef} className="flex-1 min-w-0 overflow-y-auto px-4 py-2 space-y-2">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <ChatMessageBubble
              key={msg.messageId}
              sender={msg.senderId === memberId ? "me" : "partner"}
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

      {/* ✅ 미리보기 영역 (입력창 위에 고정) */}
      {selectedImages.length > 0 && (
        <div className="absolute bottom-20 left-0 w-full bg-white py-2 border-t flex space-x-2 overflow-x-auto px-4 z-10">
          {selectedImages.map((src, idx) => (
            <div key={idx} className="relative flex-shrink-0">
              <img src={src} alt="preview" className="w-16 h-16 object-cover rounded" />
              <button
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 입력창 + 액션 */}
      <div
        className={`sticky bottom-0 bg-white flex flex-col z-20 ${selectedImages.length > 0 ? "pb-20" : ""}`}
      >
        <ChatInputBox
          onToggleActions={() => setShowActions(!showActions)}
          onSendMessage={handleSendMessage}
          isImageSelected={selectedImages.length > 0}
        />

        {showActions && (
          <div className="w-full bg-white py-4 flex justify-around border-t">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center space-y-1 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                🖼️
              </div>
              <span className="text-xs">앨범</span>
            </div>

            <div
              onClick={() => cameraInputRef.current?.click()}
              className="flex flex-col items-center space-y-1 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                📷
              </div>
              <span className="text-xs">카메라</span>
            </div>

            <div
              onClick={handleSendMoneyClick}
              className="flex flex-col items-center space-y-1 cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                💸
              </div>
              <span className="text-xs">송금</span>
            </div>
          </div>
        )}
      </div>

      {/* 숨겨진 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        multiple
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={handleFileChange}
      />

      {/* 송금 모달 */}
      <PaymentSelectModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
    </div>
  );
}
