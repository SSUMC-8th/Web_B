import { IFCredits, IFmovieInfo } from "../types/movieDetailType";
import { ErrorPage } from "../components/common/ErrorPage";
import { LoadingPage } from "../components/common/LoadingPage";
import useCostomFetch from "../hooks/useCustomFetch";

export const MovieDetailPage = () => {
  const movieId = window.location.pathname.split("/")[3];

  const {
    data: movieData,
    loading: movieLoading,
    error: movieError,
  } = useCostomFetch<IFmovieInfo>(`/${movieId}?language=ko-KR`);

  const {
    data: creditsData,
    loading: creditsLoading,
    error: creditsError,
  } = useCostomFetch<IFCredits>(`/${movieId}/credits?language=ko-KR`);

  return (
    <>
      {movieLoading || creditsLoading ? (
        <LoadingPage />
      ) : movieError || creditsError ? (
        <ErrorPage />
      ) : (
        <div className="w-[100vw] h-min-[100vh] px-10 py-10 flex  gap-20 bg-black text-white">
          <div className="w-400">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
            />
          </div>

          <div className="flex flex-col gap-6">
            {/* 제목 */}
            <h1 className="text-8xl font-bold">{movieData?.original_title}</h1>
            {/* 내용 */}
            <div className="text-xl break-keep font-semibold w-250">
              {movieData?.overview}
            </div>
            {/* 평점 */}
            <div className="text-2xl">
              <span className="font-bold">평점:</span>{" "}
              {movieData?.vote_average.toFixed(2)}
            </div>
            {/* 출연진 */}
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold">출연진</div>
              <div className="flex flex-wrap gap-4">
                {creditsData?.cast.map((actor) => (
                  <>
                    {actor.profile_path && (
                      <div className="flex flex-col" key={actor.id}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
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
                {creditsData?.crew.map((cr) => (
                  <>
                    {cr.profile_path && (
                      <div className="flex flex-col" key={cr.id}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${cr.profile_path}`}
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
                {movieData?.production_companies.map((company) => (
                  <div className="flex flex-col gap-3 items-center justify-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                      className="w-50"
                      key={company.id}
                    />
                    <div>{company.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
