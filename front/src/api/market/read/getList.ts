import axiosInstance from "@/api/axiosInstance";

export const getProductList = async () => {
  const { data } = await axiosInstance.get("/used-products");
  return data.response ?? [];
};
