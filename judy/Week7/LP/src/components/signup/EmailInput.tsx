import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../context/SignupFormContext";

interface Props {
  nextStep: () => void;
}

export const EmailInput = ({ nextStep }: Props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormFields>();

  const email = watch("email");
  // const onSubmit: SubmitHandler<FormFields> = (data) => {
  //   console.log("클릭");
  //   console.log(data);
  //   nextStep();
  // };

  return (
    <>
      {/* 소셜 로그인 */}
      <div className="w-60 h-10 flex items-center justify-between px-3 border-2 border-white rounded-md mb-5 cursor-pointer">
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
      <div className="flex flex-col gap-4">
        <input
          type={"email"}
          {...register("email")}
          placeholder="이메일을 입력해주세요!"
          className={`border rounded-md px-2 py-1 ${
            errors.email ? "border-red-600" : "border-white"
          }`}
        />
        {errors.email && (
          <div className="text-red-600 text-xs">{errors.email.message}</div>
        )}

        <button
          type="button"
          className={clsx(
            "w-60 h-9  rounded-md cursor-pointer bg-pink-600 text-white disabled:bg-neutral-900 disabled:text-gray-400"
          )}
          disabled={errors.email || email.length === 0 ? true : false}
          onClick={nextStep}
        >
          다음
        </button>
      </div>
    </>
  );
};
