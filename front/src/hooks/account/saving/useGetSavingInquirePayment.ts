import { useMutation } from "@tanstack/react-query";
import { getSavingInquirePayment } from "@/api/account/my/saving";

export const useGetSavingInquirePayment = () => {
  return useMutation({
    mutationFn: getSavingInquirePayment,
    onSuccess: (data) => {
      console.log("적금 납입 내역 조회 성공:", data);
    },
    onError: (err) => {
      console.error("적금 납입 내역 조회 실패:", err);
    },
  });
};
