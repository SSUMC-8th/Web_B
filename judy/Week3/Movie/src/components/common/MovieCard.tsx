import { useNavigate } from "react-router-dom";
import { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
}

export const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();
  const onClickMovie = (movieId: number) => {
    navigate(`/movie/detail/${movieId}`);
  };

  return (
    <div
      className={
        "w-60 h-90 rounded-md hover:scale-110 transition-all duration-300 ease-in overflow-hidden relative group cursor-pointer"
      }
      onClick={() => onClickMovie(movie.id)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="group-hover:blur-[5px]"
      />
      <div className="opacity-0 absolute top-0 left-0 w-full h-full px-3 flex flex-col items-center justify-center text-white group-hover:opacity-100 z-10">
        <div className="font-semibold text-center">{movie.title}</div>
        <div className="text-center text-sm">
          {movie.overview.length > 50
            ? movie.overview.substring(0, 50) + "..."
            : movie.overview}
        </div>
      </div>
    </div>
  );
};
