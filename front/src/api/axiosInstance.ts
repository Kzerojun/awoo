import axios from "axios";
import { refreshToken } from "@/api/user/auth";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  withCredentials: true, // refreshToken 쿠기 보내기
});

// axios 요청 시 헤더에 accessToken 자동으로 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 401 에러 (accessToken값 만료시) -> refresh 시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 419) &&
      !originalRequest._retry // 무한 루프 방지
    ) {
      originalRequest._retry = true;

      try {
        const res = await refreshToken();
        const newAccessToken = res.data.accessToken;

        // 새 accessToken 저장
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        toast.error("세션이 만료되었습니다. 다시 로그인 해주시길 바랍니다.");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
