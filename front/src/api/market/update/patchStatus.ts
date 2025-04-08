import axiosInstance from "@/api/axiosInstance";

export const patchProductStatus = (
  productId: number,
  status: "SA" | "RE" | "SO",
  type: "COMMON" | "SAFE"
) => {
  return axiosInstance.post(`/used-products/${productId}/status`, { status, type });
};
