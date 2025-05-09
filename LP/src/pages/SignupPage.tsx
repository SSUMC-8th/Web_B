import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../api/auth";

function useLocalStorage<T>(key: string, initialValue: T) {
  const setValue = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error setting localStorage key", key);
    }
  };

  return [initialValue, setValue] as const;
}

const signupSchema = z.object({
  email: z.string().email("유효한 이메일 형식이어야 합니다."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

type SignupForm = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [step, setStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // 추가
  const [confirmError, setConfirmError] = useState("");
  const [nickname, setNickname] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });
  const isPasswordStepDisabled =
    !getValues("password") ||
    getValues("password").length < 8 ||
    !confirmPassword ||
    getValues("password").trim() !== confirmPassword.trim();

  const isEmailStepDisabled = !!errors.email || getValues("email") === "";
  console.log("EMAIL:", getValues("email"));
  console.log("ERRORS:", errors);

  const handleEmailNext = () => {
    if (!errors.email) {
      setStep(2);
    }
  };

  const handlePasswordNext = () => {
    if (getValues("password").length < 8) return;

    if (
      !getValues("password") ||
      !confirmPassword ||
      getValues("password").trim() !== confirmPassword.trim()
    ) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setConfirmError("");
    setStep(3); // 다음 단계 이동
  };

  const [, setAccessToken] = useLocalStorage("accessToken", "");
  const [, setRefreshToken] = useLocalStorage("refreshToken", "");

  const handleSignup = async () => {
    try {
      const res = await signup({
        name: nickname,                // nickname을 name으로 매핑
        email: getValues("email"),
        password: getValues("password"),
        bio: "",                       // 선택값: 필요 시 다른 입력 필드로 받아도 됨
        avatar: "",                    // 선택값: 추후 URL을 받을 수 있음
      });
      const { accessToken, refreshToken } = res.data.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      alert("회원가입 완료!");
    } catch (err: any) {
      alert("회원가입 실패: " + (err.response?.data?.message || err.message));
    }
  };

  // 비밀번호와 확인란이 바뀔 때마다 실시간 에러 갱신
  useEffect(() => {
    if (
      confirmPassword &&
      getValues("password") &&
      confirmPassword.trim() !== getValues("password").trim()
    ) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError("");
    }
  }, [confirmPassword, getValues]);

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center px-4">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-black z-50">
        <h1 className="text-pink-500 font-bold text-lg">돌려돌려LP판</h1>
        <div className="flex gap-2">
          <Link to="/login">
            <button
              className={`${
                isLogin ? "bg-black text-white" : "bg-pink-500 text-white"
              } px-4 py-2 rounded-sm`}
            >
              로그인
            </button>
          </Link>
          <Link to="/signup">
            <button
              className={`${
                !isLogin ? "bg-black text-white" : "bg-pink-500 text-white"
              } px-4 py-2 rounded-sm`}
            >
              회원가입
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full sm:max-w-sm mt-20 flex flex-col gap-6 items-center">
        <div className="self-start text-xl font-semibold flex items-center gap-2">
          <span
            className="cursor-pointer"
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              } else {
                window.history.back();
              }
            }}
          >
            &lt;
          </span>
          <h1>회원가입</h1>
        </div>

        {step === 1 && (
          <>
            <button
              type="button"
              onClick={() => {
                window.location.href = "http://localhost:8000/v1/auth/google/login";
              }}
              className="w-full border border-white py-3 rounded-sm flex justify-center items-center gap-2"
            >
              <img src="/google-icon.svg" className="w-5 h-5" />
              구글 로그인
            </button>

            <div className="flex items-center w-full gap-2 text-sm text-gray-400">
              <div className="flex-grow h-px bg-gray-700" />
              <span>OR</span>
              <div className="flex-grow h-px bg-gray-700" />
            </div>

            <input
              {...register("email")}
              type="email"
              placeholder="이메일을 입력해주세요!"
              className={`bg-black border w-full p-[10px] text-white placeholder-gray-400 focus:border-[#8072ff] rounded-sm ${
                !!errors.email && !!touchedFields.email
                  ? "border-red-500 bg-red-200 text-black"
                  : "border-[#ccc]"
              }`}
            />
            {!!errors.email && !!touchedFields.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}

            <button
              onClick={handleEmailNext}
              disabled={isEmailStepDisabled}
              className={`w-full py-3 text-lg font-medium rounded-sm ${
                isEmailStepDisabled
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              다음
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="w-full text-left text-sm text-gray-300">
              {getValues("email") ?? ""}
            </div>

            <div className="relative w-full">
              <input
                {...register("password")}
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요!"
                className={`bg-black border w-full p-[10px] text-white placeholder-gray-400 focus:border-[#8072ff] rounded-sm ${
                  !!errors.password && !!touchedFields.password
                    ? "border-red-500 bg-red-200 text-black"
                    : "border-[#ccc]"
                }`}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </button>
            </div>
            {!!errors.password && !!touchedFields.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}

            <div className="relative w-full">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (
                    getValues("password") &&
                    e.target.value &&
                    getValues("password").trim() !== e.target.value.trim()
                  ) {
                    setConfirmError("비밀번호가 일치하지 않습니다.");
                  } else {
                    setConfirmError("");
                  }
                }}
                placeholder="비밀번호를 다시 한 번 입력해주세요!"
                className={`bg-black border w-full p-[10px] text-white placeholder-gray-400 focus:border-[#8072ff] rounded-sm ${
                  confirmError
                    ? "border-red-500 bg-red-200 text-black"
                    : "border-[#ccc]"
                }`}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm"
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
              >
                {confirmPasswordVisible ? "👁️" : "🙈"}
              </button>
            </div>
            {confirmError && (
              <span className="text-red-500 text-sm">{confirmError}</span>
            )}

            <button
              onClick={handlePasswordNext}
              disabled={isPasswordStepDisabled}
              className={`w-full py-3 text-lg font-medium rounded-sm ${
                isPasswordStepDisabled
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="w-full text-left text-sm text-gray-300">
              {getValues("email") ?? ""}
            </div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요!"
              className="bg-black border w-full p-[10px] text-white placeholder-gray-400 focus:border-[#8072ff] rounded-sm border-[#ccc]"
            />
            <button
              onClick={handleSignup}
              disabled={!nickname.trim()}
              className={`w-full py-3 text-lg font-medium rounded-sm ${
                !nickname.trim()
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-pink-600 text-white hover:bg-pink-700"
              }`}
            >
              회원가입 완료
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
