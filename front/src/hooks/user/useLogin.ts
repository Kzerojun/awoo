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
      // console.log("로그인 헤더 확인", res.headers.authorization);
      // 추가 (토큰 저장)
      const accessToken = res?.headers?.authorization;
      // console.log(accessToken);
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      // 유저 정보 조회 refetch
      const response = await refetchUserInfo();

      if (response.status === "success" && response.data) {
        const getUserData = response.data;
        dispatch(
          setUserData({
            nickname: getUserData.nickname,
            name: getUserData.name,
            email: getUserData.email,
            phone: getUserData.phone,
            birthDate: getUserData.birthDate,
            profileImage: getUserData.profileImage,
            paymentRegister: getUserData.paymentRegister,
            accessToken: accessToken,
          })
        );
      } else {
        console.error("로그인 후 유저 정보 가져오기 실패:", response.error);
      }

      // 스토어에도 저장
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      alert("로그인 실패.");
    },
  });
};
