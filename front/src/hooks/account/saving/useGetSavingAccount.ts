import { useQuery } from "@tanstack/react-query";
import { getSavingAccount } from "@/api/account/my/saving";

export const useGetSavingAccount = (savingId: string) => {
  return useQuery({
    queryKey: ["getSavingAccount", savingId],
    queryFn: () => getSavingAccount({ savingId }),
    enabled: !!savingId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
