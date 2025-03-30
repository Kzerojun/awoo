import { useQuery } from "@tanstack/react-query";
import { getWalkHistoryDetail } from "@/api/walk/walk";

export const useGetDetailWalkingHistory = (walkId: number) => {
  return useQuery({
    queryKey: ["getDetailWalkingHistory", walkId],
    queryFn: () => getWalkHistoryDetail(walkId),
    enabled: !!walkId,
    refetchOnWindowFocus: false,
  });
};
