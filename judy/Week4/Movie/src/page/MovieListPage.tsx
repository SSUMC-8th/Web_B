import { useEffect, useState } from "react";
import { MovieResponse } from "../types/movieType";
import { MovieCard } from "../components/movieList/MovieCard";
import { Pagination } from "../components/movieList/Pagination";
import { ErrorPage } from "../components/common/ErrorPage";
import { LoadingPage } from "../components/common/LoadingPage";
import useCostomFetch from "../hooks/useCustomFetch";

export const MovieListPage = () => {
  const [page, setPage] = useState<number>(1);
  const type = window.location.pathname.split("/")[2];
  const url = `/${type}?language=ko-KR&page=${page}`;

  useEffect(() => {
    setPage(1);
  }, [type]);

  const { data: movies, loading, error } = useCostomFetch<MovieResponse>(url);

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
            {movies?.results?.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </main>
        </div>
      )}
    </>
  );
};
