import axiosInstance from "@/api/axiosInstance";

interface OpenSavingAccountPayload {
  accountTypeUniqueNo: string;
  depositBalance: number;
  withdrawalAccountNo: string;
  conditionsAgreement: boolean;
  password: string;
  petId: number;
}

// 적금 계좌 개설 API
export const OpenSavingAccount = async (data: OpenSavingAccountPayload) => {
  const response = await axiosInstance.post("/savings", data);
  return response.data;
};
