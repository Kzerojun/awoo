import axiosInstance from "../axiosInstance";

// API response 타입
interface ApiResponse<T> {
  success: boolean;
  response: T;
  error: any;
}

// 산책 count
interface WalkingCountPayload {
  petId: number;
  startTime: string;
  endTime: string;
  distance: number;
}

// 산책 count 응답
interface WalkingCountResponse {
  walkId: number;
  memberId: number;
  petId: number;
  startTime: string;
  endTime: string;
  distance: number;
}

// 산책 count
export const countWalking = async ({
  petId,
  startTime,
  endTime,
  distance,
}: WalkingCountPayload): Promise<WalkingCountResponse> => {
  try {
    const res = await axiosInstance.post<ApiResponse<WalkingCountResponse>>(`pets/${petId}/walks`, {
      startTime,
      endTime,
      distance,
    });
    return res.data.response;
  } catch (err) {
    console.error("산책 count 실패:", err);
    throw err;
  }
};
