import axiosInstance from "@/api/axiosInstance";

export const deleteProduct = async (productId: number) => {
  const { data } = await axiosInstance.delete(`/used-products/${productId}`);
  return data;
};
