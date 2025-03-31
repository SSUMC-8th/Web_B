import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  console.log(pathname);

  return (
    <nav className="flex h-15 items-center px-5 gap-4">
      <div
        onClick={() => navigate("/")}
        className={clsx(
          "cursor-pointer",
          pathname === "/" ? "text-lime-600" : "text-black"
        )}
      >
        홈
      </div>
      <div
        onClick={() => navigate("/movies/popular")}
        className={clsx(
          "cursor-pointer",
          pathname === "/movies/popular" ? "text-lime-600" : "text-black"
        )}
      >
        인기 영화
      </div>
      <div
        onClick={() => navigate("/movies/upcoming")}
        className={clsx(
          "cursor-pointer",
          pathname === "/movies/upcoming" ? "text-lime-600" : "text-black"
        )}
      >
        상영 중
      </div>
      <div
        onClick={() => navigate("/movies/top_rated")}
        className={clsx(
          "cursor-pointer",
          pathname === "/movies/top_rated" ? "text-lime-600" : "text-black"
        )}
      >
        평점 높은
      </div>
      <div
        onClick={() => navigate("/movies/now_playing")}
        className={clsx(
          "cursor-pointer",
          pathname === "/movies/now_playing" ? "text-lime-600" : "text-black"
        )}
      >
        개봉 예정
      </div>
    </nav>
  );
};
