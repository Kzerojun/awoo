import { useQuery } from "@tanstack/react-query";
import { getScheduleDetail } from "@/api/calendar/calendar";

export const useGetScheduleDetail = (calendarId: number) => {
  return useQuery({
    queryKey: ["getScheduleDetail", calendarId],
    queryFn: () => getScheduleDetail({ calendarId }),
    enabled: !!calendarId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
