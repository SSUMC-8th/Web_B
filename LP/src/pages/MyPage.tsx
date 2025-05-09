import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

const Mypage = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const { accessToken, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching mypage user info", accessToken);
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data.data);
      } catch (err) {
        console.error("내 정보 불러오기 실패", err);
      }
    };

    fetchUser();
  }, [accessToken]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
      {user ? (
        <>
          <p>이름: {user.name}</p>
          <p>이메일: {user.email}</p>
        </>
      ) : (
        <p>로딩 중...</p>
      )}

      <div className="mt-6 space-x-4">
        <button onClick={handleLogout} className="bg-gray-600 px-4 py-2 rounded">
          로그아웃
        </button>
        <button
          onClick={() => navigate("/signout")}
          className="bg-red-600 px-4 py-2 rounded"
        >
          회원 탈퇴
        </button>
        <button
          onClick={() => navigate("/token-test")}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          토큰 테스트
        </button>
      </div>
    </div>
  );
};

export default Mypage;