
import {Params, useParams} from 'react-router-dom'
import { MovieDetailResponse } from '../types/movie'
import useCustomFetch from '../hooks/useCustomFetch'
import LoadingSpinner from '../components/LoadingSpinner'

const MovieDetailPage =() => {
  
  const params:Readonly<Params<string>> = useParams()
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}`
  const {isPending, isError, data:movie} = useCustomFetch<MovieDetailResponse>(url,'en-US')

  // const [movie,setMovie] = useState<MovieDetailResponse>()
  // const [isPending,setIsPending] = useState(false) // loading state
  // const [isError,setIsError] = useState(false) // error state


  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     setIsPending(true)

  //     try{
  //       const {data} = await axios.get<MovieDetailResponse>(
  //         ``,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  //           }
  //         },
  //       );

  //       setMovie(data);
  //     }catch{
  //       setIsError(true);
  //     }finally{
  //       setIsPending(false);
  //     }      
  //   };
  
  //   fetchMovies();
  // }, [params.movieId]);

  if(isPending){
    return (
      <div className='flex items-center justify-center h-dvh'>
              <LoadingSpinner />
      </div>
    )
  }

  if(isError){
    return(
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
      </div>
    )
  }

  console.log(params);
  return (
    <div>
      MovieDetailPage{params.movieId}
      {movie?.id}
      {movie?.production_companies.map((company)=>company.name)}
      {movie?.original_title}
      {movie?.overview}
    </div>
  )
}

export default MovieDetailPage