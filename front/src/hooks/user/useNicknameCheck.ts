import { useMutation } from "@tanstack/react-query";
import { nicknameCheck } from "@/api/user/auth";

export const useNicknameCheck = () => {
  return useMutation({
    mutationFn: nicknameCheck,
    onSuccess: (data) => {
      console.log("닉네임 사용 가능 여부:", data);
    },
    onError: (err) => {
      console.error("닉네임 중복 확인 에러:", err);
    },
  });
};
