import { useMutation } from "@tanstack/react-query";
import { getSavingTerminationInterest } from "@/api/account/my/saving";

export const useGetSavingTerminationInterest = () => {
  return useMutation({
    mutationFn: getSavingTerminationInterest,
    onSuccess: (data) => {
      console.log("쿼리 적금 만기 이자 조회 성공:", data);
    },
    onError: (err) => {
      console.error("쿼리 적금 만기 이자 조회 실패:", err);
    },
  });
};
