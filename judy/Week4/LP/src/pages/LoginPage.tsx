import clsx from "clsx";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { emailRegEx, passwordRegEx } from "../utils/regex";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswrodValid, setIsPasswordValid] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailRegEx.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordRegEx.test(e.target.value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex justify-center pt-20 text-white">
      <div className="flex flex-col">
        {/* 로그인 header */}
        <div className="flex w-60 justify-between items-center text-xl mb-7">
          <Link to={"/"}>
            <IoIosArrowBack />
          </Link>
          <span>로그인</span>
          <span></span>
        </div>
        {/* 소셜 로그인 */}
        <div className="w-60 h-10 flex items-center justify-between px-3 border-2 border-white rounded-md mb-5">
          <img src="/images/GoogleLogo.svg" alt="google_logo" className="w-6" />
          <span>구글로그인</span>
          <span></span>
        </div>

        {/* OR */}
        <div className="w-60 flex items-center justify-between mb-5">
          <div className="w-24 h-[1px] bg-white"></div>
          <div className="text-md">OR</div>
          <div className="w-24 h-[1px] bg-white"></div>
        </div>

        {/* 로그인 입력 */}
        <form className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일을 입력해주세요!"
            className="border border-white rounded-md px-2 py-1"
          />
          {email && !isEmailValid && (
            <div className="text-red-600 text-xs">
              올바른 이메일 형식을 입력해주세요.
            </div>
          )}
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호를 입력해주세요!"
            className="border border-white rounded-md px-2 py-1"
          />
          {password && !isPasswrodValid && (
            <div className="text-red-600 text-xs">
              비밀번호는 8자 이상이어야합니다.
            </div>
          )}
          <button
            type="submit"
            className={clsx(
              "w-60 h-9  rounded-md cursor-pointer",
              isEmailValid && isPasswrodValid
                ? "bg-pink-600 text-white"
                : "bg-neutral-900 text-gray-400"
            )}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};
