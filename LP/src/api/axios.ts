import axios from "axios";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/key";

import { logoutUser } from "../utils/logout";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 요청 인터셉터: accessToken 자동 삽입
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    //refresh 요청 자체는 무시 (무한루프 방지)
    if (originalRequest.url.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    // 토큰 재발급 조건
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem(REFRESH_TOKEN_KEY)
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
        const res = await api.post('/auth/refresh', { refresh });

        const { accessToken, refreshToken } = res.data.data;

        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        logoutUser();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;