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
import DayDivider from "../components/DayDivider";
import { formatDate } from "@/utils/formatDate";
import { useAppDispatch } from "@/lib/store";
import { isPaymentFinished, resetChatSystem } from "@/lib/slices/chatSystemSlice";

import { SystemPaymentComplete } from "@/app/market/chat/components/systemMessages/PaymentComplete";
import { SystemSafePaymentCompleteMe } from "../components/systemMessages/SafePaymentComplete";
import { SystemSafePaymentStart } from "../components/systemMessages/SafePaymentStart";
import { SystemSafeInfoSubmittedSeller } from "../components/systemMessages/SystemSafeInfoSubmittedSeller";
import { SystemSafeInfoSubmittedBuyer } from "../components/systemMessages/SystemSafeInfoSubmittedBuyer";
import { SystemSafeCompleteSeller } from "../components/systemMessages/SystemSafeCompleteSeller"; // 추가된 임포트

// 채팅 메시지 타입 정의
interface MessageType {
  messageId: number;
  senderId: number;
  message: string;
  createdAt: string;
  image: string | null;
  chatRoomId: number;
}

export default function ChatRoomPage() {
  // 📌 파라미터로부터 채팅방 ID 및 상품 ID 가져오기
  const { chatRoomId } = useParams() as { chatRoomId: string };
  const searchParams = useSearchParams();
  const usedProductId = searchParams.get("usedProductId");

  // 📌 채팅창 상태 관리
  const [showActions, setShowActions] = useState(false); // 액션바(앨범, 카메라, 송금) 열림 여부
  const [showPaymentModal, setShowPaymentModal] = useState(false); // 송금 모달 열림 여부
  const [messages, setMessages] = useState<MessageType[]>([]); // 채팅 메시지 리스트
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // 선택된 이미지들
  const memberId = useAppSelector((state) => state.memberId.memberId); // 내 사용자 ID
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [productId, setProductId] = useState<number | null>(null);

  const [socketReady, setSocketReady] = useState(false);

  // 📌 이미지 파일 -> Base64 변환 함수
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("Base64 변환 실패");
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };
  // ✅ 메시지가 업데이트될 때마다 스크롤 하단 고정
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    const id = searchParams.get("usedProductId");
    if (id) setProductId(Number(id));
  }, [searchParams]);
  // ✅ 채팅 기록 불러오기 & 소켓 연결
  useEffect(() => {
    if (!memberId || memberId === 0) return;
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    console.log("🔍 현재 chatSystem 상태:", chatSystem);

    const fetchMessagesAndConnect = async () => {
      try {
        // 🔄 과거 채팅 로딩
        const res = await axiosInstance.get(`/used-products/chat-rooms/${chatRoomId}`);
        const pastMessages: MessageType[] = res.data.response.chatMessages
          .map((msg: any) => ({
            messageId: msg.messageId,
            senderId: msg.senderId,
            message: msg.message,
            createdAt: msg.createdAt,
            image: msg.image,
            chatRoomId: Number(chatRoomId),
          }))
          .reverse();

        setMessages(pastMessages);

        // ✅ 소켓 연결 및 수신 이벤트 등록
        chatSocket.connect(token, Number(chatRoomId), (message: IMessage) => {
          setSocketReady(true);
          const body = message.binaryBody
            ? JSON.parse(new TextDecoder().decode((message as any).binaryBody))
            : JSON.parse(message.body);
          console.log("💬 수신된 메시지:", body); // 👈 여기서 "SAFE_FINISH" 찍히는지 확인

          // 💥 시스템 메시지일 경우, 내가 보낸 건 무시
          // const isSystemMessage =
          //   body.message === "SAFE_INFO_SUBMITTED" ||
          //   body.message === "SAFE_FINISH" ||
          //   body.message === "PAYMENT_FINISH";

          // const isMyOwnSystemMessage = isSystemMessage && body.senderId === memberId;

          // if (isMyOwnSystemMessage) {
          //   return; // ❌ 중복 렌더링 방지
          // }

          const fixedMessage: MessageType = {
            messageId: Date.now(),
            senderId: body.senderId ?? 0,
            message: body.message ?? "",
            createdAt: body.createdAt ?? new Date().toISOString(),
            image: body.image ?? null,
            chatRoomId: Number(chatRoomId),
          };
          // 💬 실시간 수신 메시지 추가
          setMessages((prev) => [...prev, fixedMessage]);
        });
      } catch (error) {
        console.error("채팅 기록 불러오기 실패", error);
      }
    };

    fetchMessagesAndConnect();

    // 언마운트 시 연결 해제
    return () => {
      chatSocket.disconnect();
    };
  }, [chatRoomId, memberId]);

  // ✅ 메시지 전송 함수
  const handleSendMessage = (text: string) => {
    if (!text.trim() && selectedImages.length === 0) return; // 비어있으면 무시

    const base64Image = selectedImages.length > 0 ? selectedImages[0].split(",")[1] : null;

    // 이미지 + 텍스트 함께 전송
    chatSocket.send(Number(chatRoomId), text, memberId, base64Image);

    // 전송 후 초기화
    setSelectedImages([]);
    setShowActions(false);
  };

  // ✅ 이미지 선택 시 base64로 변환하여 상태에 저장
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const base64Images = await Promise.all(Array.from(files).map((file) => fileToBase64(file)));
    setSelectedImages((prev) => [...prev, ...base64Images]);
    setShowActions(false);
  };

  // ✅ 선택된 이미지 삭제
  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ 송금 버튼 클릭
  const handleSendMoneyClick = () => {
    setShowActions(false);
    setShowPaymentModal(true);
  };
  const chatSystem = useAppSelector((state) => state.chatSystem);

  // ====================================
  // 💡 === 화면 렌더링 ===
  // ====================================

  return (
    <div className="flex flex-col h-screen bg-gray-50 relative">
      {/* ✅ 채팅방 헤더 */}
      <ChatRoomHeader usedProductId={productId} />
      {/* ✅ 채팅 메시지 목록 */}
      <div ref={scrollRef} className="flex-1 min-w-0 overflow-y-auto px-4 py-2 space-y-2">
        {messages.length > 0 ? (
          (() => {
            let lastDate = "";
            return messages.map((msg) => {
              const msgDate = msg.createdAt.slice(0, 10);
              const isNewDate = msgDate !== lastDate;
              lastDate = msgDate;
              // 💡 시스템 메시지 분기
              const isSystemMessage =
                msg.message === "SAFE_FINISH" ||
                msg.message === "PAYMENT_FINISH" ||
                msg.message === "SAFE_INFO_SUBMITTED" ||
                msg.message === "SAFE_COMPLETE";
              return (
                <div key={msg.messageId}>
                  {isNewDate && <DayDivider date={formatDate(msg.createdAt)} />}
                  {isSystemMessage ? (
                    <div className="text-center text-sm text-gray-500 py-2">
                      {msg.message === "SAFE_FINISH" ? (
                        msg.senderId === memberId ? (
                          <SystemSafePaymentCompleteMe sender="me" createdAt={msg.createdAt} />
                        ) : (
                          <SystemSafePaymentStart sender="partner" createdAt={msg.createdAt} />
                        )
                      ) : msg.message === "SAFE_INFO_SUBMITTED" ? (
                        msg.senderId === memberId ? (
                          <SystemSafeInfoSubmittedSeller sender="me" createdAt={msg.createdAt} />
                        ) : (
                          <SystemSafeInfoSubmittedBuyer
                            sender="partner"
                            createdAt={msg.createdAt}
                          />
                        )
                      ) : msg.message === "SAFE_COMPLETE" ? (
                        msg.senderId !== memberId && (
                          <SystemSafeCompleteSeller sender="partner" createdAt={msg.createdAt} />
                        )
                      ) : (
                        <SystemPaymentComplete
                          sender={msg.senderId === memberId ? "me" : "partner"}
                          senderName={msg.senderId === memberId ? "나" : "상대방"}
                          amount={50000} // TODO: 금액 연동 필요
                          createdAt={msg.createdAt}
                        />
                      )}
                    </div>
                  ) : (
                    <ChatMessageBubble
                      sender={msg.senderId === memberId ? "me" : "partner"}
                      content={msg.message}
                      time={msg.createdAt}
                      image={msg.image}
                    />
                  )}
                </div>
              );
            });
          })()
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            아직 채팅이 없습니다.
          </div>
        )}
      </div>

      {/* ✅ 입력창 + 선택 이미지 + 액션바 */}
      <div className="sticky bottom-0 bg-white flex flex-col z-20 pb-0.5">
        {/* 선택된 이미지 프리뷰 */}
        {selectedImages.length > 0 && (
          <div className="bg-white py-2 border-t flex space-x-2 overflow-x-auto px-4">
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
        {/* 입력창 */}
        <ChatInputBox
          onToggleActions={() => setShowActions(!showActions)}
          onSendMessage={handleSendMessage}
          isImageSelected={selectedImages.length > 0}
        />

        {/* 액션바 (앨범, 카메라, 송금) */}
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
      {/* 숨겨진 파일 입력 */}
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
      <PaymentSelectModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        chatRoomId={Number(chatRoomId)}
        usedProductId={productId ?? 0}
      />
    </div>
  );
}
