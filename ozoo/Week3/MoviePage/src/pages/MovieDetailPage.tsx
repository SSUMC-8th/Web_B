import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import {LoadingSpinner} from '../components/LoadingSpinner';

type MovieDetail = {
  backdrop_path: any;
  vote_average: ReactNode;
  tagline: ReactNode;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genres: { id: number; name: string }[];
  runtime: number;
};

type Credit = {
  cast: {
      profile_path: any; name: string; character: string 
}[];
  crew: { name: string; job: string }[];
};

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, creditRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              Accept: 'application/json',
            },
          }),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              Accept: 'application/json',
            },
          }),
        ]);
  
        if (!movieRes.ok || !creditRes.ok) throw new Error("데이터를 불러오지 못했습니다.");
  
        const movieData = await movieRes.json();
        const creditData = await creditRes.json();
  
        setMovie(movieData);
        setCredits(creditData);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner />
    </div>
  );
  if (error) return <p>에러 발생: {error}</p>;
  if (!movie || !credits) return <p>데이터가 없습니다.</p>;

  const director = credits.crew.find(member => member.job === "Director");

  return (
<div className="movie-detail-page overflow-hidden m-0 p-0">
  {/* 1. 배경 이미지 섹션 */}
  <div
  className="backdrop-section relative w-screen h-[90vh] max-w-full overflow-hidden bg-cover bg-center m-0 p-0"
    style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
    }}
>
    <div className="overlay absolute bottom-0 left-0 transform -translate-y-1/2 h-fit w-full from-black to-black/0 bg-gradient-to-r px-8 py-6 text-white text-left">
      <h1 className='text-2xl font-bold mt-2'>{movie.title}</h1>
      <p> • {movie.release_date.slice(0, 4)}년도 개봉 </p>
       <p> • 평점 {movie.vote_average} </p>
      <p> • {director?.name} 감독</p>
      <p> • {movie.genres.map((genre) => genre.name).join(", ")}</p>
      <p> • {movie.runtime}분</p>
      <p className="tagline italic text-lg text-yellow-300">{movie.tagline}</p>
      <p className="overview mt-4">{movie.overview}</p>
    </div>
  </div>

  {/* 2. 캐스트/감독 섹션 */}
  <div className="cast-crew-section grid justify-start">
    <h2 className="text-2xl font-bold mb-4 text-black text-left">감독/출연</h2>
    </div>
    <div className="cast-grid">
      {credits.cast.slice(0, 12).map((person) => (
        <div className="cast-card" key={person.name}>
          <img
            className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full shadow-md hover:shadow-xl border border-gray-300"
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                : "/no-image.png"
            }
            alt={person.name}
          />
          <p className="name text-black">{person.name}</p>
          <p className="character text-gray-400 text-sm">({person.character})</p>
        </div>
      ))}
    </div>

</div>
  );
};

export default MovieDetailPage;