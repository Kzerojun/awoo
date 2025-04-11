import axiosInstance from "@/api/axiosInstance";

export const putUsedProduct = async (id: string, formData: FormData) => {
  return await axiosInstance.put(`/used-products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
