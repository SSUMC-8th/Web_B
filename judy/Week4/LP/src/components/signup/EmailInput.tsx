import { useState } from "react";
import { emailRegEx } from "../../\butils/regex";
import clsx from "clsx";

interface Props {
  nextStep: () => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const EmailInput = ({ nextStep, email, setEmail }: Props) => {
  const [isEmailValid, setIsEmailValid] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailRegEx.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const onClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isEmailValid) {
      nextStep();
    }
  };
  return (
    <>
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

      {/* 회원가입 입력 */}
      <form className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일을 입력해주세요!"
          className="border border-white rounded-md px-2 py-1 text-sm"
        />
        {email && !isEmailValid && (
          <div className="text-red-600 text-xs">
            올바른 이메일 형식을 입력해주세요.
          </div>
        )}

        <button
          type="submit"
          className={clsx(
            "w-60 h-9  rounded-md cursor-pointer",
            isEmailValid
              ? "bg-pink-600 text-white"
              : "bg-neutral-900 text-gray-400"
          )}
          onClick={onClickNext}
        >
          다음
        </button>
      </form>
    </>
  );
};
