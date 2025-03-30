export interface ChatRoom {
  roomId: string;
  productTitle: string;
  productThumbnail: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  partnerNickname: string;
  partnerProfileImage: string;
}

export interface ChatMessage {
  messageId: string;
  sender: "me" | "partner";
  content: string;
  timestamp: string;
  type: "text" | "payment";
}
