// src/components/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* 오버레이: 클릭 시 닫힘 (모바일에서만) */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 사이드바 본체 (항상 렌더링, 모바일은 슬라이드 / 데스크탑은 고정) */}
      <aside
        className={`
            fixed top-16 left-0 w-64 h-screen overflow-y-auto bg-[#121212] text-white p-6 z-50 shadow-lg
            transition-transform duration-300 transform
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
      >
        <nav className="flex flex-col gap-6 text-sm h-full">
          <Link
            to="/"
            className={`hover:text-pink-400 ${
              isActive("/") ? "text-pink-500 font-bold" : ""
            }`}
          >
            🔍 찾기
          </Link>
          <Link
            to="/mypage"
            className={`hover:text-pink-400 ${
              isActive("/mypage") ? "text-pink-500 font-bold" : ""
            }`}
          >
            👤 마이페이지
          </Link>

          <div className="flex-1" />
          <Link
            to="/logout"
            className="text-xs hover:text-red-400 mt-auto"
          >
            🚪 탈퇴하기
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;