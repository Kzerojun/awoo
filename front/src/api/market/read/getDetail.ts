import axiosInstance from "@/api/axiosInstance";

export const getProductDetail = async (productId: string | number) => {
  const { data } = await axiosInstance.get(`/used-products/${productId}`);
  return data.response ?? null;
};
