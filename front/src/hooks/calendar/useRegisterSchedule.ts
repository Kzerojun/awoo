import { useMutation } from "@tanstack/react-query";
import { registerSchedule } from "@/api/calendar/calendar";

export const useRegisterSchedule = () => {
  return useMutation({
    mutationFn: registerSchedule,
    onSuccess: (data) => {
      console.log("쿼리 일정 등록 성공:", data);
    },
    onError: (err) => {
      console.error("쿼리 일정 등록 에러:", err);
    },
  });
};
