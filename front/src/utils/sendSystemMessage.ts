import { chatSocket } from "@/socket/chatSocket";

export const sendSystemMessage = (
  roomId: number,
  memberId: number,
  message: "PAYMENT_FINISH" | "SAFE_FINISH" | "SHIPPING" | "DONE"
) => {
  chatSocket.send(roomId, message, memberId, null);
};
