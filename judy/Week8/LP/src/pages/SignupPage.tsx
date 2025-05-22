import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { EmailInput } from "../components/signup/EmailInput";
import { PasswordInput } from "../components/signup/PasswordInput";
import { ProfileInput } from "../components/signup/ProfileInput";
import { SignupFormProvider } from "../context/SignupFormContext";

export const SignupPage = () => {
  const [step, setStep] = useState<"email" | "password" | "profile">("email");
  return (
    <SignupFormProvider>
      <div className="w-screen h-screen bg-black flex justify-center pt-20 text-white">
        <div className="flex flex-col">
          {/* 회원가입 header */}
          <div className="flex w-60 justify-between items-center text-xl mb-7">
            <Link to={"/"}>
              <IoIosArrowBack />
            </Link>
            <span>회원가입</span>
            <span></span>
          </div>
          {/* 이메일 입력 */}
          {step === "email" && (
            <EmailInput nextStep={() => setStep("password")} />
          )}
          {step === "password" && (
            <PasswordInput nextStep={() => setStep("profile")} />
          )}
          {step === "profile" && <ProfileInput />}
        </div>
      </div>
    </SignupFormProvider>
  );
};
