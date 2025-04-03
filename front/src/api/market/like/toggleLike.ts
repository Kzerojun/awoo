import axiosInstance from "@/api/axiosInstance";

export const toggleLike = (productId: number) =>
  axiosInstance.post(`/used-products/${productId}/likes`);
