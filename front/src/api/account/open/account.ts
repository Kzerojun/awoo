import axiosInstance from "@/api/axiosInstance";

interface OpenAccountRequest {
  password: string;
  conditionsAgreement: boolean;
}

export const openDepositAccount = async (data: OpenAccountRequest) => {
  const response = await axiosInstance.post("/accounts", data);
  return response.data;
};
