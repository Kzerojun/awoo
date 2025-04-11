import axiosInstance from "@/api/axiosInstance";

export const reportProduct = (productId: number, reason: string) => {
  return axiosInstance.post(`/used-products/${productId}/reports`, { reason });
};
