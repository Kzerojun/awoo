import axios from "axios";
import urlToFile from "@/app/signup/hooks/useChangeFile";
import axiosInstance from "../axiosInstance";

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

// 회원가입 API 요청
export const signup = async ({ requestDto, imageFile, selectedAvatar }: SignupPayload) => {
  const formData = new FormData();

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
  // 후에 백엔드 완성되면 주석 풀 예정
  //   try {
  //     const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.error("회원가입 실패: ", err);
  //   }
};

// 로그인 API 요청
export const login = async ({ email, password }: LoginPayload) => {
  const loginData = {
    email,
    password,
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/members/login`,
      loginData,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    // 나중에 주석 or 지우기
    console.log("로그인 성공:", res.data);
    return res;
  } catch (err) {
    console.error("로그인 실패:", err);
  }
};

// 리프레시 토큰 확인
export const refreshToken = (): Promise<{ data: { accessToken: string } }> => {
  return axiosInstance.post("/auth/refresh");
};
