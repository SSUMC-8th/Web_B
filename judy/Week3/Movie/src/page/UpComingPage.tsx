import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { Movie, MovieResponse } from "../types/movie";
import { MovieCard } from "../components/common/MovieCard";

export const UpComingPage = () => {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    // upcoming movie 데이터 가져오는 api
    const getUpcomingMovies = async () => {
      try {
        const { data } = await apiClient.get<MovieResponse>(
          `/upcoming?language=ko-KR&page=${page}`
        );
        setMovies(data.results);
      } catch (error) {
        console.error("인기 영화 목록을 불러오지 못헀습니다.", error);
      }
    };

    getUpcomingMovies();
  }, [page]);
  return (
    <div>
      <main className="flex justify-center flex-wrap gap-20">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </main>
    </div>
  );
};
