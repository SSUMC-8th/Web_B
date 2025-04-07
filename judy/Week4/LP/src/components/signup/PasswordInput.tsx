import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { passwordRegEx } from "../../\butils/regex";
import clsx from "clsx";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

interface Props {
  nextStep: () => void;
  email: string;
}

export const PasswordInput = ({ nextStep, email }: Props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [showPassword, setShowPassoword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassoword] = useState(false);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordRegEx.test(e.target.value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value) {
      setIsConfirmPasswordValid(true);
    } else {
      setIsConfirmPasswordValid(false);
    }
  };

  const onClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isPasswordValid && isConfirmPasswordValid) {
      nextStep();
    }
  };

  const showPasswordHandler = () => {
    setShowPassoword((prev) => !prev);
  };

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassoword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 이메일 */}
      <div className="flex gap-2 items-center">
        <MdEmail />
        <span>{email}</span>
      </div>

      {/* 비밀번호 입력 폼 */}
      <form className="flex flex-col gap-4">
        <div className="flex relative w-full items-center">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호를 입력해주세요!"
            className="border border-white rounded-md px-2 py-1 text-sm w-full"
          />
          <div
            className="absolute right-3 cursor-pointer"
            onClick={showPasswordHandler}
          >
            {showPassword ? <FaRegEye /> : <FaEyeSlash />}
          </div>
        </div>

        {password && !isPasswordValid && (
          <div className="text-red-600 text-xs">
            비밀번호는 8자리 이상입니다.
          </div>
        )}

        <div className="flex relative w-full items-center">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder="다시 입력해주세요!"
            className="border border-white rounded-md px-2 py-1 text-sm w-full"
          />
          <div
            className="absolute right-3 cursor-pointer"
            onClick={showConfirmPasswordHandler}
          >
            {showConfirmPassword ? <FaRegEye /> : <FaEyeSlash />}
          </div>
        </div>

        {confirmPassword && !isConfirmPasswordValid && (
          <div className="text-red-600 text-xs">
            비밀번호가 일치하지 않습니다.
          </div>
        )}

        <button
          type="submit"
          className={clsx(
            "w-60 h-9  rounded-md cursor-pointer",
            isPasswordValid && isConfirmPasswordValid
              ? "bg-pink-600 text-white"
              : "bg-neutral-900 text-gray-400"
          )}
          onClick={onClickNext}
        >
          다음
        </button>
      </form>
    </div>
  );
};
