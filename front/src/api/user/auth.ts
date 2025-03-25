import axios from "axios";
import urlToFile from "@/app/signup/hooks/useChangeFile";
import axiosInstance from "../axiosInstance";
import { headers } from "next/headers";

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

// 이메일 중복 체크
export const emailCheck = async ({ email }: EmailPayload) => {
  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/members/check-email?email=${email}`);
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
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/members`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/login`,
      loginData,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
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
  return axiosInstance.post("/auth/refresh");
};

// 유저 정보 조회
export const getUserInfo = async () => {
  try {
    const res = await axiosInstance.get("/members", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("유저 정보 조회 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("유저 정보 조회 중 에러:", err);
    throw err;
  }
};
