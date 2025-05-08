import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signin } from "../api/auth";
import { useNavigate } from "react-router-dom"; 
import { useAuthContext } from "../context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    getValues,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { login } = useAuthContext();

  const handleGoogleLogin = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    window.location.href = `${API_URL}/auth/google/login`;
  };

  const onSubmit = async (values: LoginForm) => {
    try {
      const res = await signin(values);
      const { accessToken, refreshToken, name, email } = res.data.data;
      alert(`환영합니다, ${name}님!`);
  
      
      await login({ accessToken, refreshToken, user: { name, email } });
  
      navigate("/");
    } catch (err: any) {
      alert("로그인 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex items-center justify-center px-4">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-black z-50">
        <h1 className="text-pink-500 font-bold text-lg">돌려돌려LP판</h1>
        <div className="flex gap-2">
          <Link to="/login">
            <button
              className={`${isLogin ? "bg-black text-white" : "bg-pink-500 text-white"} px-4 py-2 rounded-sm`}
            >
              로그인
            </button>
          </Link>
          <Link to="/signup">
            <button
              className={`${!isLogin ? "bg-black text-white" : "bg-pink-500 text-white"} px-4 py-2 rounded-sm`}
            >
              회원가입
            </button>
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:max-w-sm px-6 py-8 flex flex-col items-center gap-6 mt-20">
        <div className="flex items-center self-start gap-2 text-xl font-semibold">
          <span className="cursor-pointer">&lt;</span>
          <h1>로그인</h1>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full border border-white py-3 rounded-sm gap-2">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          <span>구글 로그인</span>
        </button>

        <div className="flex items-center w-full gap-2 text-sm text-gray-400">
          <div className="flex-grow h-px bg-gray-700" />
          <span>OR</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>

        <input
          {...register("email")}
          defaultValue=""
          type="email"
          placeholder="이메일을 입력해주세요!"
          className={`bg-black border w-full p-[10px] text-white placeholder-gray-400 focus:border-[#8072ff] rounded-sm ${
            errors?.email && touchedFields.email
              ? "border-red-500 bg-red-200 text-black"
              : "border-[#ccc]"
          }`}
        />
        {errors?.email && touchedFields.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <input
          {...register("password")}
          name="password"
          defaultValue=""
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          className={`bg-black border w-full p-[10px] text-white placeholder-gray-400 focus:border-[#8072ff] rounded-sm ${
            errors?.password && touchedFields.password
              ? "border-red-500 bg-red-200 text-black"
              : "border-[#ccc]"
          }`}
        />
        {errors?.password && touchedFields.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}

        <button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className={`w-full bg-blue-600 text-white py-3 text-lg font-medium hover:bg-blue-700 transition-colors rounded-sm ${
            isSubmitting || Object.keys(errors).length > 0 ? "bg-gray-300 cursor-not-allowed" : ""
          }`}
        >
          로그인
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
