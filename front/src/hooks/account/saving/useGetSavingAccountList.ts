import { useQuery } from "@tanstack/react-query";
import { getSavingAccountList } from "@/api/account/my/saving";

export const useGetSavingAccountList = () => {
  return useQuery({
    queryKey: ["getSavingAccountList"],
    queryFn: getSavingAccountList,
    enabled: true,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

// enabled: true 이면
// 이 쿼리를 가져다 쓰는 컴포넌트가 마운트될 때 자동으로 호출
