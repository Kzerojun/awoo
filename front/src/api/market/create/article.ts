import axiosInstance from "@/api/axiosInstance";

export const postUsedProduct = async (data: FormData) => {
  const res = await axiosInstance.post("/used-products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
