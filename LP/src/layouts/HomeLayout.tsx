import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 bg-black z-50">
        <h1 className="text-pink-500 font-bold text-lg">돌려돌려LP판</h1>
        <a
          href="/mypage"
          className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
        >
          마이페이지
        </a>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>푸터</p>
      </footer>
    </div>
  );
};

export default HomeLayout;