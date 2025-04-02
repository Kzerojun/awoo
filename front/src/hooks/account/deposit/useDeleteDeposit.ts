import { useMutation } from "@tanstack/react-query";
import { deleteDeposit } from "@/api/account/my/deposit";

export const useDeleteDeposit = () => {
  return useMutation({
    mutationFn: deleteDeposit,
    onSuccess: (data) => {
      console.log("내부 계좌 해지 성공:", data);
    },
    onError: (err) => {
      console.error("내부 계좌 해지 실패:", err);
    },
  });
};
