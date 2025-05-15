import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DeleteUserModal from "../components/DeleteUserModal"; // added import
import { Outlet, useNavigate } from "react-router-dom"; // added useNavigate

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "회원 탈퇴 실패");
      }

      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (err: any) {
      console.error("회원 탈퇴 실패:", err);
      alert(`회원 탈퇴에 실패했습니다: ${err.message}`);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="sticky top-0 z-50">
        <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      </div>
      <div
        className={`
          fixed top-0 left-0 z-40 h-[calc(100vh-4rem)] w-64 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onRequestDelete={() => setShowDeleteModal(true)}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto z-0">
          <Outlet />
        </main>
      </div>

      {showDeleteModal && (
        <DeleteUserModal
          onDelete={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      <footer className="bg-gray-800 text-white text-center py-4">
        © 2025 돌려돌려 LP판. All rights reserved.
      </footer>
    </div>
  );
};

export default HomeLayout;
