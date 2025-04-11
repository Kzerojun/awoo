import { useQuery } from "@tanstack/react-query";
import { getPayRegisterCheck } from "@/api/account/my/deposit";

export const useGetPayRegisterCheck = () => {
  return useQuery({
    queryKey: ["payRegisterCheck"],
    queryFn: getPayRegisterCheck,
    enabled: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
