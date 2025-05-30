import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { isLoggedIn, logout, isLoading, user } = useAuthContext();
  const navigate = useNavigate();

  if (isLoading) return null;

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#121212] z-50 h-16">
      {/* 왼쪽: 햄버거 + 로고 */}
      <div className="flex items-center gap-4">
        <button className="text-white text-2xl" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1
          onClick={() => navigate("/")}
          className="text-pink-500 font-bold text-2xl cursor-pointer"
        >
          돌려돌려LP판
        </h1>
      </div>

      {/* 오른쪽: 검색 + 로그인 영역 */}
      <div className="flex items-center gap-4">
        {/* 검색 아이콘 */}
        <div className="flex items-center">
          <button onClick={() => navigate("/search")}>
            <FiSearch className="text-white text-xl cursor-pointer" />
          </button>
        </div>

        {isLoggedIn ? (
          <>
            <span key={user?.name} className="text-white text-sm">
              {user?.name ?? "회원"}님 반갑습니다.
            </span>
            <button
              onClick={logout}
              className="text-white text-sm hover:underline"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-white text-sm hover:underline"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-white bg-pink-500 px-3 py-1 text-sm rounded-md hover:bg-pink-600"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
