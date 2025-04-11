import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

class ChatSocket {
  private stompClient: Client | null = null;
  socket: WebSocket | null = null;

  connect(
    token: string,
    roomId: number,
    onMessage: (message: IMessage) => void,
    onReady?: () => void
  ) {
    // 이미 연결되어있으면 재연결 안함
    if (this.stompClient && this.stompClient.connected) return;

    const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_BASE_URL}/used-products/ws`);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `${token}`,
      },
      debug: (str) => console.log("[STOMP]", str),
      reconnectDelay: 3000,
      onConnect: () => {
        console.log("✅ STOMP 연결 성공");
        this.subscribe(roomId, onMessage);
        if (onReady) onReady(); // ✅ 연결 완료 후 콜백 실행
      },
    });

    this.stompClient.activate();
  }

  subscribe(roomId: number, callback: (message: IMessage) => void) {
    if (!this.stompClient || !this.stompClient.connected) return;

    this.stompClient.subscribe(`/sub/chat/rooms/${roomId}`, (message) => {
      console.log("💬 수신된 메시지", message);
      callback(message);
    });

    console.log("✅ 채팅방 구독 완료 - roomId:", roomId);
  }

  send(roomId: number, message: string, memberId: number, image: string | null = null) {
    if (!this.stompClient || !this.stompClient.connected) return;
    const token = localStorage.getItem("accessToken");
    console.log(`메시지 전송: ${message}`);
    const payload = {
      message,
      image,
      senderId: memberId,
    };
    console.log("실제 전송 payload", payload);
    // ✅ image 기본 null 적용
    this.stompClient.publish({
      destination: `/pub/chat/rooms/${roomId}`,
      headers: {
        Authorization: `${token}`,
        "X-User-Id": String(memberId),
      },
      body: JSON.stringify({ message, image, senderId: memberId }),
    });
    console.log("🚀 메시지 발송");
  }

  disconnect() {
    this.stompClient?.deactivate();
    this.stompClient = null;
    console.log("❌ 연결 종료");
  }
}

export const chatSocket = new ChatSocket();
