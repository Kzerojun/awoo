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

// 산책 count, 반려견 산책 기록 조회, 멤버별 산책 기록 조회 응답
interface WalkingResponse {
  walkId: number;
  memberId: number;
  petId: number;
  startTime: string;
  endTime: string;
  distance: number;
}

// 산책 기록 전체 조회 (반려견) interface
interface GetPetWalkListResponse {
  walks: WalkingResponse[];
}

// 산책 기록 전체 조회 (멤버별) interface
interface GetMemberWalkListResponse {
  walks: WalkingResponse[];
}

//  이번 달 산책 기록 조회(반려견)
interface GetPetWalkInMonthResponse {
  walks: WalkingResponse[];
}

// 산책 count
export const countWalking = async ({
  petId,
  startTime,
  endTime,
  distance,
}: WalkingCountPayload): Promise<WalkingResponse> => {
  try {
    const res = await axiosInstance.post<ApiResponse<WalkingResponse>>(`pets/${petId}/walks`, {
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

// 반려견별 산책 기록 전체 조회
export const getPetWalkingHistory = async (petId: number): Promise<WalkingResponse[]> => {
  try {
    const res = await axiosInstance.get<ApiResponse<GetPetWalkListResponse>>(
      `/pets/${petId}/walks`
    );
    console.log("반려견별 산책 기록 전체 조회 성공:", res.data.response.walks);
    return res.data.response.walks;
  } catch (err) {
    console.error("반려견별 산책 기록 전체 조회 실패:", err);
    throw err;
  }
};

// 멤버별 산책 기록 전체 조회
export const getMemberWalkingHistory = async (memberId: number): Promise<WalkingResponse[]> => {
  try {
    const res = await axiosInstance.get<ApiResponse<GetMemberWalkListResponse>>(
      `/pets/walks/member/${memberId}`
    );
    console.log("멤버별 산책 기록 전체 조회 성공:", res.data.response.walks);
    return res.data.response.walks;
  } catch (err) {
    console.error("멤버별 산책 기록 전체 조회 실패:", err);
    throw err;
  }
};

// 이번 달 산책 기록 조회(반려견)
export const getPetWalkInMonthHistory = async (petId: number): Promise<WalkingResponse[]> => {
  try {
    const res = await axiosInstance.get<ApiResponse<GetMemberWalkListResponse>>(
      `/pets/${petId}/walks/inMonth`
    );
    console.log("이번달 반려견 산책 기록 전체 조회 성공:", res.data.response.walks);
    return res.data.response.walks;
  } catch (err) {
    console.error("이번달 반려견 산책 기록 전체 조회 실패:", err);
    throw err;
  }
};

// 산책 기록 상세 조회
export const getWalkHistoryDetail = async (walkId: number): Promise<WalkingResponse> => {
  try {
    const res = await axiosInstance.get<ApiResponse<WalkingResponse>>(`/pets/walks/${walkId}`);
    console.log("산책 기록 상세 조회 성공:", res.data.response);
    return res.data.response;
  } catch (err) {
    console.error("산책 기록 상세 조회 실패:", err);
    throw err;
  }
};
