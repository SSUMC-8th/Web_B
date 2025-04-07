import clsx from "clsx";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const ProfileInput = () => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onClickConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nickname.length !== 0) {
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <FaRegCircleUser size={120} />

      <input
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={onChangeNickname}
        className="border border-white rounded-md px-2 py-1 text-sm w-full"
      />

      <button
        className={clsx(
          " w-full rounded-md text-center py-1 cursor-pointer",
          nickname.length === 0
            ? "bg-neutral-900 text-gray-400"
            : "bg-pink-600 text-white"
        )}
        onClick={onClickConfirm}
      >
        회원가입 완료
      </button>
    </div>
  );
};
