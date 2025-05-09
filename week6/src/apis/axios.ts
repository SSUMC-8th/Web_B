import { LOCAL_STORAGE_KEY } from '../constants/key';
import { useLocalStorage } from '../hooks/useLocalStorage';
import axios, { AxiosRequestConfig } from 'axios';


interface CustomAxiosRequestConfig extends AxiosRequestConfig { // 요청 재시로 여부 나타내는 플래그
  retry?: boolean
}

// refreshToken 요청을 위한 Promise 전역으로 저장해서 중복요청 방지
let refreshPromise: Promise<string> | null = null

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
  // }
  withCredentials: true, //include cookie
});


// 요청이 들어오기 전에 실행되는 인터셉터
// 요청이 들어오기 전에 access토큰을 authorization헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const{getItem} = useLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
  const accessToken = getItem()

  if (accessToken) {
    config.headers = config.headers || {}; // headers가 undefined일 수 있으므로 초기화
    config.headers.Authorization = `Bearer ${accessToken}`; // accessToken을 Authorization 헤더에 추가
  }
  return config; // 수정된 요청 객체를 반환
},(error) => Promise.reject(error) // 에러가 발생했을 때는 Promise.reject(error)로 에러를 전달하여 다음 인터셉터로 넘김

)
