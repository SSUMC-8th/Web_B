import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { Movie, MovieResponse } from "../types/movie";
import { MovieCard } from "../components/common/MovieCard";
import { Pagination } from "../components/common/Pagination";
import { ErrorPage } from "../components/common/ErrorPage";
import { LoadingPage } from "../components/common/LoadingPage";

export const MovieListPage = () => {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoaing] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const type = window.location.pathname.split("/")[2];

  useEffect(() => {
    setLoaing(true);
    //movie 데이터 가져오는 api
    const getUpcomingMovies = async () => {
      try {
        const { data } = await apiClient.get<MovieResponse>(
          `/${type}?language=ko-KR&page=${page}`
        );
        setMovies(data.results);
      } catch (error) {
        console.error("인기 영화 목록을 불러오지 못헀습니다.", error);
        setError(true);
      }

      setLoaing(false);
    };

    getUpcomingMovies();
  }, [page, type]);
  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : error ? (
        <ErrorPage />
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
