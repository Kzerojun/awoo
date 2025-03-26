import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/user/auth";

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: false, // 초기 자동 호출 방지
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
