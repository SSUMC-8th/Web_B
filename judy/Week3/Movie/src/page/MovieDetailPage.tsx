import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { IFmovieInfo } from "../types/movieDetail";

export const MovieDetailPage = () => {
  const [movie, setMovie] = useState<IFmovieInfo | null>(null);
  const movieId = window.location.pathname.split("/")[3];
  useEffect(() => {
    const getMovieInfo = async () => {
      const { data } = await apiClient.get(`/${movieId}?language=ko-KR`);
      console.log(data);

      const newMovie = {
        id: data.id,
        backdrop_path: data.backdrop_path,
        genres: data.genres,
        original_title: data.original_title,
        title: data.title,
        overview: data.overview,
        poster_path: data.poster_path,
        release_date: data.release_date,
        production_companies: data.production_companies,
        vote_average: data.vote_average,
      };

      setMovie(newMovie);
    };

    getMovieInfo();
  }, [movieId]);

  return (
    <div className="w-[100vw] h-[100vh] px-10 py-10 flex items-center gap-50 ">
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`}
        className="h-250"
      />
      <div className="flex flex-col w-220 gap-6">
        <div className="text-8xl font-bold">{movie?.original_title}</div>
        <div className="text-2xl break-keep font-semibold">
          {movie?.overview}
        </div>
        <div className="text-2xl">
          <span className="font-bold">평점:</span>{" "}
          {movie?.vote_average.toFixed(2)}
        </div>
        <div className="flex flex-col gap-5 font-bold">
          <div className="text-2xl">제작회사</div>
          <div className="flex gap-20">
            {movie?.production_companies.map((company) => (
              <>
                <img
                  src={`https://image.tmdb.org/t/p/w1280${company.logo_path}`}
                  className="w-50"
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
