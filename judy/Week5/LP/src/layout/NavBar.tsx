import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="h-14 flex justify-between items-center bg-neutral-900 px-7">
      <h2 className="text-pink-600 font-bold text-xl">돌려돌려LP판</h2>
      <div className="flex gap-4">
        {isLogin ? (
          <>
            <Link
              className="w-25 h-10 flex justify-center items-center rounded-md bg-pink-600 text-white cursor-pointer"
              to={"/mypage"}
            >
              마이페이지
            </Link>
          </>
        ) : (
          <>
            <Link
              className="w-20 h-10 flex justify-center items-center rounded-md bg-black text-white cursor-pointer"
              to={"/login"}
            >
              로그인
            </Link>
            <Link
              className="w-20 h-10 flex justify-center items-center rounded-md bg-pink-600 text-white cursor-pointer"
              to={"/signup"}
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
