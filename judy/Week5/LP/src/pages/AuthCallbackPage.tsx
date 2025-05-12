import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallbackPage = () => {
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);

      navigate("/home");
    }
  }, []);
  return <div>로그인 중...</div>;
};
