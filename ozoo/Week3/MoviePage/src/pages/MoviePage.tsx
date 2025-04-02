import { useState, useEffect } from "react";
import { Movie, MovieResponse } from '../types/movie.ts';

import axios from 'axios';
import MovieCard from "../components/MovieCard.tsx";
import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import PageButtons from "../components/PageButtons.tsx";
import { useParams } from "react-router-dom";

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const params = useParams<{ category: string }>();

    console.log(params);
  
    useEffect(() => {
      if (!params.category) return;

      const fetchMovies = async () => {

        setIsPending(true);
        try {
          const { data } = await axios.get<MovieResponse>(
            `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          );

          console.log(data.results);
          setMovies(data.results);
        
        } catch (error) {
          setError(true);
          console.error("영화 데이터를 불러오는 데 실패했습니다:", error);
        } finally {
          setIsPending(false);
        }
      };
  
      fetchMovies();
    }, [page, params.category]);

    console.log(movies);

   if(error){
    return (
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
      </div>
    );
    
   }
  
    return (
      <>
      <PageButtons page={page} setPage={setPage} />
      <div>
        {isPending && (
          <div className="flex items-center justify-center h-dvh">
            <LoadingSpinner />
          </div>
        )}
      </div>
      {!isPending && (
        <div className="p-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      </>
    );

};

export default MoviesPage;