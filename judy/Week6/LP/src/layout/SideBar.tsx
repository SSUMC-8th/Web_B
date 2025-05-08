import { FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="fixed top-15 left-0 h-[calc(100vh-3.75rem)] w-45 bg-neutral-900 flex flex-col justify-between px-5 py-5">
      <div className="flex flex-col gap-3">
        <div className="text-white text-sm cursor-pointer flex items-center gap-2">
          <span>
            <FaSearch />
          </span>{" "}
          <span>찾기</span>
        </div>
        <Link
          to={"/mypage"}
          className="text-white text-sm cursor-pointer flex items-center gap-2"
        >
          <span>
            <FaUser />
          </span>
          <span>마이페이지</span>
        </Link>
      </div>

      <div className="text-white text-sm cursor-pointer">탈퇴하기</div>
    </div>
  );
};
