import { useMutation } from "@tanstack/react-query";
import { accountTransfer } from "@/api/account/my/deposit";

export const useAccountTransfer = () => {
  return useMutation({
    mutationFn: accountTransfer,
    onSuccess: (data) => {
      console.log("계좌 이체 성공:", data);
    },
    onError: (err) => {
      console.error("계좌 이체 실패:", err);
    },
  });
};
