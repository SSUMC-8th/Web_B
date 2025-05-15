import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const alreadyHandled = useRef(false);

  useEffect(() => {
    if (alreadyHandled.current) return;

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const userId = params.get("userId");
    const name = params.get("name");

    if (!accessToken || !refreshToken || !userId || !name) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      navigate("/login");
      return;
    }

    const fetchEmailAndLogin = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const { email } = res.data.data;

        await login({
          accessToken,
          refreshToken,
          user: { id: Number(userId), name, email },
        });

        alreadyHandled.current = true;
        alert(`${name}님, 구글 로그인에 성공하셨습니다!`);
        navigate("/");
      } catch (err) {
        alert("유저 정보 조회 실패");
        navigate("/login");
      }
    };

    fetchEmailAndLogin();
  }, []);

  return <div className="text-white">구글 로그인 처리 중입니다...</div>;
};

export default GoogleCallback;
