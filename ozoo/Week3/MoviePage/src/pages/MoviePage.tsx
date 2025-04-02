import {useState, useEffect} from "react";
import { Movie, MovieResponse } from '../types/movie.ts';

import axios from 'axios';
import MovieCard from "../components/MovieCard.tsx";

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
  
    console.log(movies);

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const { data } = await axios.get<MovieResponse>(
            'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      
              },
            }
          );

          console.log(data.results);
          setMovies(data.results);
        } catch (error) {
          console.error("영화 데이터를 불러오는 데 실패했습니다:", error);
        }
      };
  
      fetchMovies();
    }, []);

    console.log(movies);
  
    return (
      <div className="p-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gird-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );

  };

  export default MoviesPage;