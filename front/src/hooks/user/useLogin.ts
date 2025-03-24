import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/user/auth";
import { useAppDispatch } from "@/lib/store";
import { setUserData } from "@/lib/slices/userSlice";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      console.log("로그인 성공", res);
      // 추가 (토큰 저장)
      const accessToken = res?.headers?.authorization;
      localStorage.setItem("accessToken", accessToken);
      // 스토어에도 저장
      dispatch(
        setUserData({
          accessToken: accessToken,
        })
      );
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
};
