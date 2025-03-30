import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { Movie, MovieResponse } from "../types/movie";
import { MovieCard } from "../components/common/MovieCard";

export const PopularPage = () => {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const { data } = await apiClient.get<MovieResponse>(
          `/popular?language=ko-KR&page=${page}`
        );
        console.log(data);
        setMovies(data.results);
      } catch (error) {
        console.error("인기 영화 목록을 불러오지 못헀습니다.", error);
      }
    };

    getPopularMovies();
  }, [page]);
  return (
    <div>
      <main className="flex justify-center flex-wrap gap-7">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </main>
    </div>
  );
};
