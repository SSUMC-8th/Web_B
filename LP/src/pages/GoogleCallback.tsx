import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const alreadyHandled = useRef(false); // 실행 여부 저장

  useEffect(() => {
    if (alreadyHandled.current) return; // 이미 처리했으면 return

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const userId = params.get("userId");
    const name = params.get("name");

    if (!accessToken || !refreshToken) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      navigate("/login");
      return;
    }

    //성공 처리 (딱 1회만 실행됨)
    login({ accessToken, refreshToken });
    localStorage.setItem("userId", userId || "");
    localStorage.setItem("userName", name || "");
    alert(`${name}님, 구글 로그인에 성공하셨습니다!`);
    alreadyHandled.current = true;
    navigate("/");
  }, []);

  return <div className="text-white">구글 로그인 처리 중입니다...</div>;
};

export default GoogleCallback;