import axiosInstance from "@/api/axiosInstance";

export const getInternalAccounts = async () => {
  const { data } = await axiosInstance.get("/accounts");
  return data.response[0]; // 입출금은 1개라 바로 반환
};
