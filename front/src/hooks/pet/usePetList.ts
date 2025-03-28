import { useQuery } from "@tanstack/react-query";
import { getPetList } from "@/api/pet/pet";

export const usePetList = () => {
  return useQuery({
    queryKey: ["petList"],
    queryFn: getPetList,
    enabled: false, // 초기 자동 호출 방지
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
