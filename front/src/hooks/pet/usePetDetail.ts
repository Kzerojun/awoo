import { useQuery } from "@tanstack/react-query";
import { getPetDetail } from "@/api/pet/pet";

export const usePetDetail = (petId: number) => {
  return useQuery({
    queryKey: ["petDetail", petId],
    queryFn: () => getPetDetail({ petId }),
    enabled: !!petId,
    staleTime: 0,
    retry: 1,
    refetchOnWindowFocus: true,
  });
};
