import axiosInstance from "@/api/axiosInstance";

export const requestAuthCode = async (name: string, phone: string) => {
  return await axiosInstance.post("/payments/auth/phone-send", { name, phone });
};

export const verifyAuthCode = async (phone: string, authCode: string) => {
  return await axiosInstance.post("/payments/auth/phone-verifications", { phone, authCode });
};
