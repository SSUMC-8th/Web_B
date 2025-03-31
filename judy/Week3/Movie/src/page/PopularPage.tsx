import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { Movie, MovieResponse } from "../types/movie";
import { MovieCard } from "../components/common/MovieCard";
import { Pagination } from "../components/common/Pagination";

export const PopularPage = () => {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    // popular movie 데이터 가져오는 api
    const getPopularMovies = async () => {
      try {
        const { data } = await apiClient.get<MovieResponse>(
          `/popular?language=ko-KR&page=${page}`
        );
        setMovies(data.results);
      } catch (error) {
        console.error("인기 영화 목록을 불러오지 못헀습니다.", error);
      }
    };

    getPopularMovies();
  }, [page]);

  return (
    <div>
      <Pagination page={page} setPage={setPage} />
      <main className="flex justify-center flex-wrap gap-20">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </main>
    </div>
  );
};
