import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface IFMyInfo {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

interface IFLogout {
  status: boolean;
  statusCode: number;
  message: string;
  data: null;
}

export const MyPage = () => {
  const [myInfo, setMyInfo] = useState<IFMyInfo["data"] | null>(null);
  const naviagte = useNavigate();

  useEffect(() => {
    // 내 정보 조회
    const getMyInfo = async () => {
      try {
        const { data } = await apiClient.get<IFMyInfo>("/users/me");
        console.log(data);
        setMyInfo(data.data);
      } catch (error) {
        console.log(error);
        alert("마이페이지 정보를 가져오는데 오류가 발생했습니다.");
      }
    };

    getMyInfo();
  }, []);

  //로그아웃
  const handleLogout = async () => {
    try {
      const { data } = await apiClient.post<IFLogout>("/auth/signout", {});
      if (data.statusCode === 201) {
        naviagte("/login");
        // localstorage에 저장해놓은 accessToken과 refreshToken 삭제
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
      }
    } catch (error) {
      console.log(error);
      alert("로그아웃에 실패했습니다. ");
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex justify-center">
      <div className="flex flex-col items-center mt-15 h-96 justify-between">
        <div className="flex flex-col items-center">
          <FaUserCircle color="white" size={"150"} className="mb-3" />
          <span className="text-white text-l">닉네임: {myInfo?.name}</span>
          <span className="text-white text-l">이메일: {myInfo?.email}</span>
        </div>

        <div
          className="text-red-400 w-full cursor-pointer flex justify-end"
          onClick={handleLogout}
        >
          로그아웃
        </div>
      </div>
    </div>
  );
};
