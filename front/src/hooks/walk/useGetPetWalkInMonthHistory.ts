import { useQuery } from "@tanstack/react-query";
import { getPetWalkInMonthHistory } from "@/api/walk/walk";

export const useGetPetWalkInMonthHistory = (petId: number) => {
  return useQuery({
    queryKey: ["getPetWalkingHistory", petId],
    queryFn: () => getPetWalkInMonthHistory(petId),
    enabled: !!petId,
    refetchOnWindowFocus: false,
  });
};
