import { useMutation } from "@tanstack/react-query";
import { countWalking } from "@/api/walk/walk";

export const useWalkingCount = () => {
  return useMutation({
    mutationFn: countWalking,
    onSuccess: (data) => {
      console.log("쿼리 산책 기록 카운트 완료:", data);
    },
    onError: (err) => {
      console.error("쿼리 산책 기록 카운트 에러:", err);
    },
  });
};
