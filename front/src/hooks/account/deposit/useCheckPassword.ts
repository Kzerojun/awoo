import { useMutation } from "@tanstack/react-query";
import { checkPassword } from "@/api/account/my/deposit";

export const useCheckPassword = () => {
  return useMutation({
    mutationFn: checkPassword,
    onSuccess: (data) => {
      console.log("쿼리 비밀번호 확인 성공:", data);
    },
    onError: (err) => {
      console.error("쿼리 비밀번호 확인 실패:", err);
    },
  });
};
