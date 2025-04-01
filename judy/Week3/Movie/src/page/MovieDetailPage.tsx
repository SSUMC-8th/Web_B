import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { IFCredits, IFmovieInfo } from "../types/movieDetail";
import { ErrorPage } from "../components/common/ErrorPage";
import { LoadingPage } from "../components/common/LoadingPage";

export const MovieDetailPage = () => {
  const [movie, setMovie] = useState<IFmovieInfo | null>(null);
  const [credit, setCredit] = useState<IFCredits | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const movieId = window.location.pathname.split("/")[3];

  useEffect(() => {
    setLoading(true);
    const getMovieInfo = async () => {
      try {
        const { data } = await apiClient.get(`/${movieId}?language=ko-KR`);

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
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    const getCredit = async () => {
      try {
        const { data } = await apiClient.get(
          `/${movieId}/credits?language=ko-KR`
        );
        setCredit(data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    getMovieInfo();
    getCredit();
    setLoading(false);
  }, [movieId]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : error ? (
        <ErrorPage />
      ) : (
        <div className="w-[100vw] h-min-[100vh] px-10 py-10 flex  gap-20 bg-black text-white">
          <div className="w-400">
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`}
            />
          </div>

          <div className="flex flex-col gap-6">
            {/* 제목 */}
            <h1 className="text-8xl font-bold">{movie?.original_title}</h1>
            {/* 내용 */}
            <div className="text-2xl break-keep font-semibold w-250">
              {movie?.overview}
            </div>
            {/* 평점 */}
            <div className="text-2xl">
              <span className="font-bold">평점:</span>{" "}
              {movie?.vote_average.toFixed(2)}
            </div>
            {/* 출연진 */}
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold">출연진</div>
              <div className="flex flex-wrap gap-4">
                {credit?.cast.map((actor) => (
                  <>
                    {actor.profile_path && (
                      <div className="flex flex-col">
                        <img
                          src={`https://image.tmdb.org/t/p/w1280${actor.profile_path}`}
                          className="w-30"
                          key={actor.id}
                        />
                        <div>
                          {actor.name.length > 10
                            ? actor.name.substring(0, 12) + "..."
                            : actor.name}
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>

            {/* 제작진 */}
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold">제작진</div>
              <div className="flex flex-wrap gap-4">
                {credit?.crew.map((cr) => (
                  <>
                    {cr.profile_path && (
                      <div className="flex flex-col">
                        <img
                          src={`https://image.tmdb.org/t/p/w1280${cr.profile_path}`}
                          className="w-30"
                          key={cr.id}
                        />
                        <div>
                          {cr.name.length > 10
                            ? cr.name.substring(0, 10) + "..."
                            : cr.name}
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5 font-bold">
              <div className="text-2xl">제작회사</div>
              <div className="flex gap-20">
                {movie?.production_companies.map((company) => (
                  <>
                    <img
                      src={`https://image.tmdb.org/t/p/w1280${company.logo_path}`}
                      className="w-50"
                      key={company.id}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
