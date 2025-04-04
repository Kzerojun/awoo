import { useMutation } from "@tanstack/react-query";
import { getSavingEarlyTerminationInterest } from "@/api/account/my/saving";

export const useGetEarlySavingTerminationInterest = () => {
  return useMutation({
    mutationFn: getSavingEarlyTerminationInterest,
    onSuccess: (data) => {
      console.log("쿼리 중도해지 이자 조회 성공:", data);
    },
    onError: (err) => {
      console.error("쿼리 중도해지 이자 조회 실패:", err);
    },
  });
};
