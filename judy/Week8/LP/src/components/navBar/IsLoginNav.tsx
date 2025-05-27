import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

export const IsLoginNav = () => {
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const response = await apiClient.get("/users/me");
    return response.data;
  };

  const LogoutMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/signout");
    },
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("id");
      navigate("/login");
    },
    onError: (err) => {
      console.error(err);
      alert("로그아웃에 실패했습니다.");
    },
  });

  const userLogout = async () => {
    LogoutMutation.mutate();
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
