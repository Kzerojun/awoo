import axiosInstance from "@/api/axiosInstance";

export const patchProductStatus = (productId: number, status: "SA" | "RE" | "SO") => {
  return axiosInstance.patch(`/used-products/${productId}/status`, { status });
};
