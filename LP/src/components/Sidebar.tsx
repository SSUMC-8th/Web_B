// src/components/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestDelete: () => void; // 추가
}

const Sidebar = ({ isOpen, onClose, onRequestDelete }: SidebarProps) => {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path || (path === "/" && location.pathname === "");

  return (
    <>
      {/* 오버레이 */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 사이드바 */}
      <aside
        className={`
          fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#121212] text-white p-6 z-50 shadow-lg
          transition-transform duration-300 transform flex flex-col justify-between
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="flex flex-col gap-6 text-sm">
          <div className="flex flex-col gap-6">
            <Link
              to="/"
              className={`hover:text-pink-400 ${
                location.pathname === "/" ? "text-pink-500 font-bold" : ""
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
          </div>
          <button
            onClick={onRequestDelete}
            className="text-xs hover:text-red-400 text-left"
          >
            🚪 탈퇴하기
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
