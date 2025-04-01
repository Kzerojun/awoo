import { useQuery } from "@tanstack/react-query";
import { getDepositAccountList } from "@/api/account/my/deposit";

export const useDepositList = () => {
  return useQuery({
    queryKey: ["depositList"],
    queryFn: getDepositAccountList,
    enabled: false, // 초기 자동 호출 방지
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
