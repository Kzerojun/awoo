import { useMutation } from "@tanstack/react-query";
import { postTransactionMemo } from "@/api/account/my/deposit";

export const usePostTransactionMemo = () => {
  return useMutation({
    mutationFn: postTransactionMemo,
    onSuccess: (data) => {
      console.log("쿼리 거래 내역 메모 등록 성공:", data);
    },
    onError: (err) => {
      console.error("쿼리 거래 내역 메모 등록 실패:", err);
    },
  });
};
