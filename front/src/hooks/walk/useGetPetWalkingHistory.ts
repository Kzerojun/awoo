import { useQuery } from "@tanstack/react-query";
import { getPetWalkingHistory } from "@/api/walk/walk";

export const useGetPetWalkingHistory = (petId: number) => {
  return useQuery({
    queryKey: ["getPetWalkingHistory", petId],
    queryFn: () => getPetWalkingHistory(petId),
    enabled: !!petId,
    refetchOnWindowFocus: false,
  });
};
