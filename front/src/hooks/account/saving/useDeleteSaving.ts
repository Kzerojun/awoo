import { useMutation } from "@tanstack/react-query";
import { deleteSavingAccount } from "@/api/account/my/saving";

export const useDeleteSaving = () => {
  return useMutation({
    mutationFn: deleteSavingAccount,
    onSuccess: (data) => {
      console.log("쿼리 적금 해지 성공:", data);
    },
    onError: (err) => {
      console.error("쿼리 적금 해지 실패:", err);
    },
  });
};
