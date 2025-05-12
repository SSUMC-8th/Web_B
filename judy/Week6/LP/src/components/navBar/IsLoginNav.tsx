import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

export const IsLoginNav = () => {
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const response = await apiClient.get("/users/me");
    return response.data;
  };

  const userLogout = async () => {
    try {
      const response = await apiClient.post("/auth/signout");
      if (response.data.statusCode === 201) {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        alert("로그아웃이 되었습니다.");
        navigate("/login");
      }
      return response.data;
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });

  return (
    <>
      <span className="text-white text-sm">{`${data?.data.name}님 반갑습니다.`}</span>
      <span className="text-white text-sm cursor-pointer" onClick={userLogout}>
        로그아웃
      </span>
    </>
  );
};
