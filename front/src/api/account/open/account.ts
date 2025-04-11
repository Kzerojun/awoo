import axiosInstance from "@/api/axiosInstance";

interface OpenAccountRequest {
  password: string;
  conditionsAgreement: boolean;
}

export const OpenDepositAccount = async (data: OpenAccountRequest) => {
  const response = await axiosInstance.post("/accounts", data);
  console.log("✅ 계좌 개설 응답:", response.data);
  return response.data;
};
