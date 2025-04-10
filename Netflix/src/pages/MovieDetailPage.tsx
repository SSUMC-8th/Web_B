import axios from 'axios'
import { useState, useEffect } from 'react'
import {Params, useParams} from 'react-router-dom'
import { Movie, MovieDetailResponse, MovieResponse } from '../types/movie'

const MovieDetailPage =() => {
  
  const params:Readonly<Params<string>> = useParams()
  const [movie,setMovie] = useState<MovieDetailResponse>()
  const [isPending,setIsPending] = useState(false) // loading state
  const [isError,setIsError] = useState(false) // error state


  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true)

      try{
        const {data} = await axios.get<MovieDetailResponse>(
          `https://api.themoviedb.org/3/movie/${params.movieId}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            }
          },
        );

        setMovie(data);
      }catch{
        setIsError(true);
      }finally{
        setIsPending(false);
      }      
    };
  
    fetchMovies();
  }, [params.movieId]);

  if(isError){
    return(
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
      </div>
    )
  }

  console.log(params);
  return <div>MovieDetailPage{params.movieId}</div>
}

export default MovieDetailPage