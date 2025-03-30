import { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
}

export const MovieCard = ({ movie }: Props) => {
  return (
    <div
      className={
        "w-40 h-60 rounded-md hover:scale-110 transition-all duration-300 ease-in overflow-hidden relative flex group"
      }
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="group-hover:blur-[5px]"
      />
      <div className="opacity-0 absolute w-full h-full px-3 flex flex-col items-center justify-center group-hover:opacity-100 z-10">
        <div className="text-white font-semibold text-center">{movie.name}</div>
        <div className="text-white text-center text-sm">{movie.overview}</div>
      </div>
    </div>
  );
};
