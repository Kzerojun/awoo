import { useQuery } from "@tanstack/react-query";
import { getSavingAccountList } from "@/api/account/my/saving";

export const useGetSavingAccountList = () => {
  return useQuery({
    queryKey: ["getSavingAccountList"],
    queryFn: getSavingAccountList,
    enabled: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
