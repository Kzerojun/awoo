import axiosInstance from "@/api/axiosInstance";

export const getInternalAccounts = async () => {
  const { data } = await axiosInstance.get("/accounts");
  const response = data.response;
  // 개선
  if (!response || !Array.isArray(response) || response.length === 0) {
    return null; // 정상적으로 계좌가 없는 경우
  }
  return response[0];
};
