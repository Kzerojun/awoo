import { useMutation } from "@tanstack/react-query";
import { deleteSchedule } from "@/api/calendar/calendar";

export const useDeleteSchedule = () => {
  return useMutation({
    mutationFn: deleteSchedule,
  });
};
