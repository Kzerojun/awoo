import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 메시지 타입 정의 (채팅 메시지 1건)
interface Message {
  messageId: number; // 메시지 고유 ID
  message: string; // 텍스트 내용
  chatRoomId: number; // 메시지가 속한 채팅방 ID
  senderId: number; // 발신자 ID
  image: string | null; // 이미지 URL (없으면 null)
  createdAt: string; // 메시지 작성 시간
}

// 채팅방 타입 정의
interface ChatRoom {
  chatRoomId: number; // 채팅방 고유 ID
  usedProductId: number | null; // 중고상품 ID
  latestMessage: string | null; // 최근 메시지 (리스트용)
  latestMessageCreatedAt: string | null; // 최근 메시지 생성일
  sellerNickname: string; // 상대방 (판매자) 닉네임
}

// 채팅 Slice의 상태 구조 정의
interface ChatState {
  chatRooms: ChatRoom[]; // 사용자가 참여한 채팅방 리스트
  currentRoom: ChatRoom | null; // 현재 접속 중인 채팅방
  messages: Record<number, Message[]>; // 채팅방별 메시지 리스트 { [chatRoomId]: Message[] }
  isConnected: boolean; // WebSocket 연결 여부
}

// 채팅 slice 정의
const initialState: ChatState = {
  chatRooms: [], // 처음엔 채팅방 없음
  currentRoom: null, // 아직 입장한 방 없음
  messages: {}, // 메시지 기록 없음
  isConnected: false, // 소켓 미연결
};

// 채팅 slice 정의
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // 전체 채팅방 목록 설정
    setChatRooms(state, action: PayloadAction<ChatRoom[]>) {
      state.chatRooms = action.payload;
    },
    // 현재 입장한 채팅방 설정
    setCurrentRoom(state, action: PayloadAction<ChatRoom>) {
      state.currentRoom = action.payload;
    },
    // 특정 채팅방 메시지 목록 세팅 (채팅방 입장 시 사용)
    setMessages(state, action: PayloadAction<{ roomId: number; messages: Message[] }>) {
      state.messages[action.payload.roomId] = action.payload.messages;
    },
    // 실시간으로 들어온 메시지 1개 추가
    addMessage(state, action: PayloadAction<{ roomId: number; message: Message }>) {
      if (!state.messages[action.payload.roomId]) {
        state.messages[action.payload.roomId] = []; // 해당 채팅방 메시지 배열이 없을 경우 초기화
      }
      state.messages[action.payload.roomId].push(action.payload.message); // 메시지 추가
    },
    // 소켓 연결 여부 관리 (연결됨 / 끊김)
    setIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { setChatRooms, setCurrentRoom, setMessages, addMessage, setIsConnected } =
  chatSlice.actions;
export default chatSlice.reducer;
