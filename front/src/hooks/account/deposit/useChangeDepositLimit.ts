import { useMutation } from "@tanstack/react-query";
import { changeDepositLimit } from "@/api/account/my/deposit";

export const useChangeDepositLimit = () => {
  return useMutation({
    mutationFn: changeDepositLimit,
    onSuccess: (data) => {
      console.log("쿼리 이체 한도 변경 성공:", data);
    },
    onError: (err) => {
      console.log("쿼리 이체 한도 변경 실패:", err);
    },
  });
};
