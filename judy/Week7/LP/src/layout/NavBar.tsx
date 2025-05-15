import { useEffect, useState } from "react";
import { IsLoginNav } from "../components/navBar/IsLoginNav";
import { IsGuestNav } from "../components/navBar/IsGuestNav";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props {
  handleSidebar: () => void;
}

export const NavBar = ({ handleSidebar }: Props) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="h-15 flex justify-between items-center bg-neutral-900 px-7 fixed w-full z-30">
      <div className="flex">
        <div className="text-white flex items-center gap-2 cursor-pointer">
          <MdMenu size={25} onClick={handleSidebar} />
          <h2
            className="text-pink-600 font-bold text-xl"
            onClick={() => navigate("/")}
          >
            돌려돌려LP판
          </h2>
        </div>
      </div>

      <div className="flex gap-4">
        {isLogin ? <IsLoginNav /> : <IsGuestNav />}
      </div>
    </div>
  );
};
