import axiosInstance from "../axiosInstance";

interface ApiResponse<T> {
  success: boolean;
  response: T;
  error: any;
}

// 일정 등록 후 반환 response
interface RegisterScheduleResponse {
  calendarId: number;
  memberId: number;
  petId: number;
  scheduleContent: string;
  startTime: string;
  endTime: string;
  color: string;
}

// 일정 조회 후 반환 response
interface ScheduleResponse {
  calendarId: number;
  memberId: number;
  petName: string;
  petProfileImage: string;
  scheduleContent: string;
  startTime: string;
  endTime: string;
  color: string;
}

// 일정 등록 interface
interface RegisterSchedulePayload {
  petId: number;
  scheduleContent: string;
  startTime: string;
  endTime: string;
  color: string;
}

// 일정 수정 interface
interface UpdateSchedulePayload {
  calendarId: number;
  petId: number;
  scheduleContent: string;
  startTime: string;
  endTime: string;
  color: string;
}

// 캘린더 list response
interface CalendarListResponse {
  calendarList: ScheduleResponse[];
}

// 캘린더 Id interface
interface CalendarIdPayload {
  calendarId: number;
}

// 반려견 Id interface
interface PetIdPayload {
  petId: number;
}

// 일정 등록
export const registerSchedule = async ({
  petId,
  scheduleContent,
  startTime,
  endTime,
  color,
}: RegisterSchedulePayload): Promise<RegisterScheduleResponse> => {
  try {
    const res = await axiosInstance.post<ApiResponse<RegisterScheduleResponse>>(`/calendars`, {
      petId,
      scheduleContent,
      startTime,
      endTime,
      color,
    });
    return res.data.response;
  } catch (err) {
    console.error("일정 등록 실패:", err);
    throw err;
  }
};

// 일정 조회 (멤버별)
export const getMemberSchedule = async (): Promise<ScheduleResponse[]> => {
  try {
    const res = await axiosInstance.get<ApiResponse<CalendarListResponse>>("/calendars");
    console.log("멤버별 일정 전체 조회 성공:", res.data.response.calendarList);
    return res.data.response.calendarList;
  } catch (err) {
    console.error("멤버별 일정 전체 조회 실패:", err);
    throw err;
  }
};

// 일정 조회 (반려견별)
export const getPetSchedule = async ({ petId }: PetIdPayload): Promise<ScheduleResponse[]> => {
  try {
    const res = await axiosInstance.get<ApiResponse<CalendarListResponse>>(`/calendars/${petId}`);
    console.log("반려견별 일정 전체 조회 성공:", res.data.response.calendarList);
    return res.data.response.calendarList;
  } catch (err) {
    console.error("반려견별 일정 전체 조회 실패:", err);
    throw err;
  }
};

// 일정 상세 조회
export const getScheduleDetail = async ({
  calendarId,
}: CalendarIdPayload): Promise<ScheduleResponse> => {
  try {
    const res = await axiosInstance.get<ApiResponse<ScheduleResponse>>(`/calendars/${calendarId}`);
    console.log("일정 상세 조회 성공:", res.data.response);
    return res.data.response;
  } catch (err) {
    console.error("일정 상세 조회 싪패:", err);
    throw err;
  }
};

// 일정 수정
export const updateSchedule = async ({
  calendarId,
  petId,
  scheduleContent,
  startTime,
  endTime,
  color,
}: UpdateSchedulePayload): Promise<ScheduleResponse> => {
  try {
    const res = await axiosInstance.put<ApiResponse<ScheduleResponse>>(`/calendars/${calendarId}`, {
      petId,
      scheduleContent,
      startTime,
      endTime,
      color,
    });
    console.log("일정 수정 성공:", res.data.response);
    return res.data.response;
  } catch (err) {
    console.error("일정 수정 실패:", err);
    throw err;
  }
};

// 일정 삭제
export const deleteSchedule = async ({ calendarId }: CalendarIdPayload) => {
  try {
    const res = await axiosInstance.delete(`/calendars/${calendarId}`);
    console.log("일정 삭제 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("일정 삭제 실패:", err);
    throw err;
  }
};
