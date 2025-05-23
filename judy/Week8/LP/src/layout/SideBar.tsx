import { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BackgroundBlur } from "../components/common/BackgroundBlur";
import { WithdrawalModal } from "../components/sideBar/WithdrawalModal";

export const SideBar = () => {
  const navigate = useNavigate();
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] =
    useState<boolean>(false);
  return (
    <>
      <div className="fixed top-15 left-0 h-[calc(100vh-3.75rem)] w-45 bg-neutral-900 flex flex-col justify-between px-5 py-5">
        <div className="flex flex-col gap-3">
          <div
            className="text-white text-sm cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/search")}
          >
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

        <div
          className="text-white text-sm cursor-pointer"
          onClick={() => setIsWithdrawalModalOpen(true)}
        >
          탈퇴하기
        </div>
      </div>

      {isWithdrawalModalOpen && (
        <BackgroundBlur>
          <WithdrawalModal
            handleClose={() => setIsWithdrawalModalOpen(false)}
          />
        </BackgroundBlur>
      )}
    </>
  );
};
