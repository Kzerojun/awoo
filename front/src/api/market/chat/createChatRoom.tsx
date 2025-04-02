import axiosInstance from "@/api/axiosInstance";
// 채팅방 생성 API
export const createChatRoom = async (usedProductId: number) => {
  const res = await axiosInstance.post("/used-products/chat-rooms", {
    usedProductId,
  });
  return res.data;
};
