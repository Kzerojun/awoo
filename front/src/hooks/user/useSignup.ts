import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/user/auth";

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("회원가입 완료", data);
    },
    onError: (err) => {
      console.error("회원가입 실패", err);
    },
  });
};
