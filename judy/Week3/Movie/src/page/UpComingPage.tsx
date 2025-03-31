import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { Movie, MovieResponse } from "../types/movie";
import { MovieCard } from "../components/common/MovieCard";
import { Pagination } from "../components/common/Pagination";

export const UpComingPage = () => {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoaing] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    setLoaing(true);
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

      setLoaing(false);
    };

    getUpcomingMovies();
  }, [page]);
  return (
    <>
      {loading ? (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
          <span className="w-12 h-12 border-4 border-lime-400 border-b-transparent rounded-full animate-spin"></span>
        </div>
      ) : (
        <div>
          <Pagination page={page} setPage={setPage} />
          <main className="flex justify-center flex-wrap gap-20">
            {movies?.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </main>
        </div>
      )}
    </>
  );
};
