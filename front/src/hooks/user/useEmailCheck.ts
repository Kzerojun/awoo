import { useMutation } from "@tanstack/react-query";
import { emailCheck } from "@/api/user/auth";

export const useEmailCheck = () => {
  return useMutation({
    mutationFn: emailCheck,
    onSuccess: (data) => {
      console.log("이메일 사용 가능 여부:", data);
    },
    onError: (err) => {
      console.error("이메일 중복 확인 에러:", err);
    },
  });
};
