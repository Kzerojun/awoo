import axiosInstance from "@/api/axiosInstance";

export const putUsedProduct = async (data: FormData) => {
  const res = await axiosInstance.put("/used-products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
