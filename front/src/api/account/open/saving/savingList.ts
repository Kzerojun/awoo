import axiosInstance from "@/api/axiosInstance";
import type { SavingAccount } from "@/app/home/myaccount/components/saving/types/saving";

export const getSavingList = async (): Promise<SavingAccount[]> => {
  const { data } = await axiosInstance.get("/savings");
  return data.response;
};
