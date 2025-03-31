import { useMutation } from "@tanstack/react-query";
import { getTransactionList } from "@/api/account/my/deposit";

export const useGetTransactionList = () => {
  return useMutation({
    mutationFn: getTransactionList,
    onSuccess: (data) => {
      console.log("거래 내역 목록 조회 성공:", data);
    },
    onError: (err) => {
      console.error("거래 내역 목록 조회 실패:", err);
    },
  });
};
