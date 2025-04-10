import clsx from "clsx";

import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { UserSigninInfomation, validateSignin } from "../utils/regex";
import useForm from "../hooks/useForm";
import { apiClient } from "../api/apiClient";
import { LoginRequest } from "../types/LoginType";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInfomation>({
      initalValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    console.log(values);

    try {
      const response = await apiClient.post<LoginRequest>("/auth/signin", {
        email: values.email,
        password: values.password,
      });
      const data = response.data.data;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true
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
        <div className="flex flex-col gap-4">
          <input
            {...getInputProps("email")}
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요!"
            className={`border  rounded-md px-2 py-1 ${
              errors?.email && touched?.email
                ? "border-red-600"
                : "border-white"
            }`}
          />
          {errors?.email && touched?.email && (
            <div className="text-red-600 text-xs">{errors?.email}</div>
          )}
          <input
            {...getInputProps("password")}
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요!"
            className="border border-white rounded-md px-2 py-1"
          />
          {errors?.password && touched?.password && (
            <div className="text-red-600 text-xs">{errors?.password}</div>
          )}
          <button
            type="button"
            className={clsx(
              "w-60 h-9  rounded-md cursor-pointer bg-pink-600 text-white disabled:bg-neutral-900 disabled:text-gray-400"
            )}
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};
