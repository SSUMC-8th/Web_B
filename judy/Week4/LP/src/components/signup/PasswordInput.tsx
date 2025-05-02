import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../context/SignupFormContext";

interface Props {
  nextStep: () => void;
}

export const PasswordInput = ({ nextStep }: Props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormFields>();
  const email = watch("email");

  const [showPassword, setShowPassoword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassoword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassoword((prev) => !prev);
  };

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassoword((prev) => !prev);
  };

  // const onSubmit: SubmitHandler<FormFields> = (data) => {
  //   console.log(data);
  //   nextStep();
  // };

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
            {...register("password")}
            placeholder="비밀번호를 입력해주세요!"
            className="border border-white rounded-md px-2 py-1 text-sm w-full"
            autoComplete="new-password"
          />
          <div
            className="absolute right-3 cursor-pointer"
            onClick={showPasswordHandler}
          >
            {showPassword ? <FaRegEye /> : <FaEyeSlash />}
          </div>
        </div>

        {errors.password && (
          <div className="text-red-600 text-xs">{errors.password.message}</div>
        )}

        <div className="flex relative w-full items-center">
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="다시 입력해주세요!"
            className="border border-white rounded-md px-2 py-1 text-sm w-full"
            autoComplete="new-password"
          />
          <div
            className="absolute right-3 cursor-pointer"
            onClick={showConfirmPasswordHandler}
          >
            {showConfirmPassword ? <FaRegEye /> : <FaEyeSlash />}
          </div>
        </div>

        {errors.confirmPassword && (
          <div className="text-red-600 text-xs">
            {errors.confirmPassword.message}
          </div>
        )}

        <button
          type="submit"
          className={
            "w-60 h-9  rounded-md cursor-pointer bg-pink-600 text-white disabled:bg-neutral-900 disabled:text-gray-400"
          }
          onClick={nextStep}
          disabled={errors.password || errors.confirmPassword ? true : false}
        >
          다음
        </button>
      </form>
    </div>
  );
};
