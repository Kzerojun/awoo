import axios from "axios";
import { refreshToken } from "@/api/user/auth";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  withCredentials: true, // refreshToken 쿠기 보내기
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// axios 요청 시 헤더에 accessToken 자동으로 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    // console.log("axios instane 토큰 :", token);
    if (token) {
      config.headers.Authorization = `${token}`;
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
    console.log("리프레쉬 토큰 확인");
    if (
      (error.response?.status === 401 || error.response?.status === 419) &&
      !originalRequest._retry // 무한 루프 방지
    ) {
      if (originalRequest.url.includes("/members/refresh")) {
        // refreshToken 자체가 실패한 경우 (세션 만료)
        localStorage.removeItem("accessToken");
        alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token as string}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await refreshToken();
        const newAccessToken = res.data.accessToken;

        // 새 accessToken 저장
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        console.error("리프레시 토큰 실패:", err);
        alert("세션이 만료되었습니다. 다시 로그인 해주시길 바랍니다.");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
