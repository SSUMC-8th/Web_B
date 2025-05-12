import { Link } from "react-router-dom";

export const IsGuestNav = () => {
  return (
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
  );
};
