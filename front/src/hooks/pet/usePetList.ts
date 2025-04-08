import { useQuery } from "@tanstack/react-query";
import { getPetList } from "@/api/pet/pet";

export const usePetList = () => {
  return useQuery({
    queryKey: ["petList"],
    queryFn: getPetList,
    enabled: true, // 초기 자동 호출 방지
    staleTime: 0,
    retry: 1,
    refetchOnWindowFocus: true,
  });
};
