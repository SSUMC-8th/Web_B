import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export const SignupPage = () => {
  return (
    <div className="w-screen h-screen bg-black flex justify-center pt-20 text-white">
      <div className="flex flex-col">
        {/* 회원가입 header */}
        <div className="flex w-50 justify-between items-center text-xl">
          <Link to={"/"}>
            <IoIosArrowBack />
          </Link>
          <span>회원가입</span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
