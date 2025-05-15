import { IoClose } from "react-icons/io5";
import { withdrawalUser } from "../../api/userApi";

interface Props {
  handleClose: () => void;
}

export const WithdrawalModal = ({ handleClose }: Props) => {
  const handleWithdrawal = async () => {
    try {
      await withdrawalUser();
      console.log("회원탈퇴 완료");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      alert("탈퇴 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className="flex flex-col w-120 h-70 bg-neutral-700 rounded-md text-white px-4 py-3">
      <div className="w-full flex justify-end cursor-pointer">
        <IoClose onClick={handleClose} size={20} />
      </div>

      <div className="flex flex-1 flex-col gap-8 justify-center items-center">
        <div>정말 탈퇴하시겠습니까?</div>

        <div className="flex gap-6">
          <button
            className="w-20 h-7 bg-neutral-300 text-black rounded-md curosr-pointer"
            onClick={handleWithdrawal}
          >
            예
          </button>
          <button
            className="w-20 h-7 bg-pink-600 rounded-md cursor-pointer"
            onClick={handleClose}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};
