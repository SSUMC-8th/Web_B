import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormFields } from "../../context/SignupFormContext";
import { apiClient } from "../../api/apiClient";

export const ProfileInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<FormFields>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      const response = await apiClient.post("/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log("회원가입 성공: ", response.data);
      navigate("/login");
    } catch (e) {
      console.error("에러 발생: ", e);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <FaRegCircleUser size={120} />

      <input
        placeholder="닉네임을 입력해주세요"
        {...register("name")}
        className="border border-white rounded-md px-2 py-1  w-full"
      />
      {errors.name && (
        <div className="text-red-600 text-xs">{errors.name.message}</div>
      )}

      <button
        className={
          "w-60 h-9  rounded-md cursor-pointer bg-pink-600 text-white disabled:bg-neutral-900 disabled:text-gray-400"
        }
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
      >
        회원가입 완료
      </button>
    </div>
  );
};
