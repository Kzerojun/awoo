import axiosInstance from "@/api/axiosInstance";

export const getSavingList = async () => {
  const { data } = await axiosInstance.get("/savings");
  return data.response;
};
