import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/user/auth";
import { useAppDispatch } from "@/lib/store";
import { setUserData } from "@/lib/slices/userSlice";

export const useLogin = (refetchUserInfo: () => Promise<any>) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      console.log("로그인 성공", res);
      // 추가 (토큰 저장)
      const accessToken = res?.headers?.authorization;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      // 유저 정보 조회 refetch
      const { data: userData } = await refetchUserInfo();

      // 스토어에도 저장
      dispatch(
        setUserData({
          nickname: userData.nickname,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          birthDate: userData.birthDate,
          profileImage: userData.profileImage,
          accessToken: accessToken,
        })
      );
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
};
