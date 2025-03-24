import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/user/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      console.log("로그인 성공", res);
      // 추가 (토큰 저장)
      const accessToken = res?.headers?.authorization;
      localStorage.setItem("accessToken", accessToken);
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
};
