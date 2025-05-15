import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // initialize once

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="sticky top-0 z-50">
        <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto z-0">
          <Outlet />
        </main>
      </div>

      <footer className="bg-gray-800 text-white text-center py-4">
        © 2025 돌려돌려 LP판. All rights reserved.
      </footer>
    </div>
  );
};

export default HomeLayout;