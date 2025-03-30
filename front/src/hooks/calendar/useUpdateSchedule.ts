import { useMutation } from "@tanstack/react-query";
import { updateSchedule } from "@/api/calendar/calendar";

export const useUpdateSchedule = () => {
  return useMutation({
    mutationFn: updateSchedule,
    onSuccess: (data) => {
      console.log("쿼리 일정 수정 성공:", data);
    },
    onError: (err) => {
      console.error("쿼리 일정 수정 에러:", err);
    },
  });
};
