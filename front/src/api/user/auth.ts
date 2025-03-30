import axios from "axios";
import urlToFile from "@/app/signup/hooks/useChangeFile";
import axiosInstance from "../axiosInstance";

// 이메일 interface
interface EmailPayload {
  email: string;
}

// 닉네임 interface
interface NicknamePayload {
  nickname: string;
}

// 회원가입 interface
interface SignupPayload {
  requestDto: Record<string, any>;
  imageFile: File | null;
  selectedAvatar: string;
}

// 로그인 interface
interface LoginPayload {
  email: string;
  password: string;
}

// 유저 정보 조회 interface
interface UserInfo {
  nickname: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  profileImage: string;
  paymentRegister: boolean;
  walkGrade: number;
}

// 프로필 수정 interface
interface UpdateProfilePayload {
  nickname?: string;
  name?: string;
  phone?: string;
  imageFile?: File | null;
}

// 비밀번호 재설정 interface
interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}

// 회원 탈퇴 interface
interface DeleteAccountPayload {
  password: string;
}

// 이메일 중복 체크
export const emailCheck = async ({ email }: EmailPayload) => {
  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/members/check-email?email=${email}`);
  console.log("이메일 요청 데이터", email);
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/check-email?email=${email}`
    );
    console.log("이메일 중복 확인 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("이메일 중복 확인 실패:", err);
    throw err;
  }
};

// 닉네임 중복 체크
export const nicknameCheck = async ({ nickname }: NicknamePayload) => {
  console.log("닉네임 요청 데이터");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/check-nickname?nickname=${nickname}`
    );
    console.log("닉네임 중복 확인:", res.data);
    return res.data;
  } catch (err) {
    console.error("닉네임 중복 확인 에러:", err);
    throw err;
  }
};

// 회원가입 API 요청
export const signup = async ({ requestDto, imageFile, selectedAvatar }: SignupPayload) => {
  const formData = new FormData();
  console.log("회원가입 요청 데이터", formData);

  formData.append(
    "requestDto",
    new Blob([JSON.stringify(requestDto)], {
      type: "application/json",
    })
  );

  if (imageFile) {
    formData.append("profileImage", imageFile);
  } else if (!imageFile && selectedAvatar !== "") {
    const file = await urlToFile(selectedAvatar, "default-avatar.jpg");
    formData.append("profileImage", file);
  }

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/members`, formData);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("회원가입 실패: ", err);
    throw err;
  }
};

// 로그인 API 요청
export const login = async ({ email, password }: LoginPayload) => {
  const loginData = {
    email,
    password,
  };
  console.log("로그인 요청 데이터", loginData);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/login`,
      loginData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // 나중에 주석 or 지우기
    console.log("로그인 성공:", res.data);
    return res;
  } catch (err) {
    console.error("로그인 실패:", err);
    throw err;
  }
};

// 리프레시 토큰 확인
export const refreshToken = (): Promise<{ data: { accessToken: string } }> => {
  return axiosInstance.post("/members/refresh");
};

// 유저 정보 조회
export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const res = await axiosInstance.get("/members");
    console.log("유저 정보 조회 성공:", res.data);
    return res.data.response;
  } catch (err) {
    console.error("유저 정보 조회 중 에러:", err);
    throw err;
  }
};

// 프로필 수정 API 요청
export const updateProfile = async (payload: UpdateProfilePayload) => {
  const formData = new FormData();

  // 기본 정보를 JSON으로 변환하여 추가
  const requestDto = {
    name: payload.name,
    phone: payload.phone,
    nickname: payload.nickname,
  };

  // null이나 undefined인 필드 제거
  const cleanedRequestDto = Object.fromEntries(
    Object.entries(requestDto).filter(([_, value]) => value !== undefined)
  );

  formData.append(
    "requestDto",
    new Blob([JSON.stringify(cleanedRequestDto)], {
      type: "application/json",
    })
  );

  // 이미지 파일이 있으면 추가
  if (payload.imageFile) {
    formData.append("profileImage", payload.imageFile);
  }

  console.log("프로필 수정 요청 데이터", cleanedRequestDto);

  try {
    const res = await axiosInstance.put("/members", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("프로필 수정 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("프로필 수정 실패:", err);
    throw err;
  }
};

// 비밀번호 재설정 API 요청
export const resetPassword = async ({ email, newPassword }: ResetPasswordPayload) => {
  const passwordData = {
    email,
    newPassword,
  };

  console.log("비밀번호 재설정 요청");

  try {
    const res = await axiosInstance.patch("/members/password", passwordData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("비밀번호 재설정 성공");
    return res.data;
  } catch (err) {
    console.error("비밀번호 재설정 실패:", err);
    throw err;
  }
};

// 회원 탈퇴 API 요청
export const deleteAccount = async ({ password }: DeleteAccountPayload) => {
  console.log("회원 탈퇴 요청");

  try {
    const res = await axiosInstance.delete("/members", {
      data: { password },
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 탈퇴 성공 시 로컬 스토리지 토큰 제거
    localStorage.removeItem("accessToken");

    console.log("회원 탈퇴 성공");
    return res.data;
  } catch (err) {
    console.error("회원 탈퇴 실패:", err);
    throw err;
  }
};
