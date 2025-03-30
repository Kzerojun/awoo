import { useQuery } from "@tanstack/react-query";
import { getPetSchedule } from "@/api/calendar/calendar";

export const useGetPetSchedule = (petId: number) => {
  return useQuery({
    queryKey: ["getPetSchedule", petId],
    queryFn: () => getPetSchedule({ petId }),
    enabled: !!petId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
