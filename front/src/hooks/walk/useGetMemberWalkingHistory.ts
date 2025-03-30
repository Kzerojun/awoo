import { useQuery } from "@tanstack/react-query";
import { getMemberWalkingHistory } from "@/api/walk/walk";

export const useGetMemberWalkingHistory = (memberId: number) => {
  return useQuery({
    queryKey: ["getMemberWalkingHistory", memberId],
    queryFn: () => getMemberWalkingHistory(memberId),
    enabled: !!memberId,
    refetchOnWindowFocus: false,
  });
};
