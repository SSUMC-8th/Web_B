import { MovieFilter } from '../components/MovieFilter'
import { MovieList } from '../components/MovieList'
import useFetch from '../hooks/useFetch'
import type { MovieFilters, MovieResponse } from '../types/movie'


export default function HomePage() {
  const [filters, setFilters] = useFetch<MovieFilters>({
    query: '',
    include_adult: false,
    language: 'ko-KR',
  })

  const { data, error, isLoading } = useFetch<MovieResponse>('/search/movie',{
    params: {
      query: '어벤져스',
      include_adult: false, 
      language: 'ko-KR',
    } as MovieFilters,
  })

  if (error) {
    return <div className='container'>Error: {error}</div>
  }

  return (<div className='container'>
    <MovieFilter onChange={()=>{}} />
      { isLoading ? (
        <div>Loading...</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
  </div>
  )

}
