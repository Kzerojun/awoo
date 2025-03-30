import { useQuery } from "@tanstack/react-query";
import { getMemberSchedule } from "@/api/calendar/calendar";

export const useGetMemberSchedule = () => {
  return useQuery({
    queryKey: ["getMemberSchedule"],
    queryFn: getMemberSchedule,
    enabled: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
