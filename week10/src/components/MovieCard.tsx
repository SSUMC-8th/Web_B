import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
}

const MovieCard = ({movie}:MovieCardProps) => {
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'
const fallbackImage = 'https://via.placeholder.com/640x480'
  return (
    <div className='cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg'>
      <div className='relative h-80 overflow-hidden'>
        <img src={movie.poster_path 
          ? `${imageBaseUrl}${movie.poster_path}` 
          : fallbackImage} 
          alt={`${movie.title} 포스터`}
          className='h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105' 
        />
        <div className='absolute right-2 top-2 rounded-md bg-black-500 px-2 py-1 text-sm font-bold text-white'>
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className='p-4'>
        <h3 className='mb-2 text-lg font-semibold text-gray-800 line-clamp-2'>{movie.title}</h3>
        <p className='text-sm text-gray-600 line-clamp-3'>{movie.overview}</p>
        <p className='mt-2 text-xs text-gray-500'>개봉일: {new Date(movie.release_date).toLocaleDateString()}</p>
      </div>
      <div className='flex items-center justify-between border-t p-4'>
        <span className='text-sm text-gray-500'>평점: {movie.vote_average.toFixed(1)}</span>
        <span className='text-sm text-gray-500'>조회수: {movie.vote_count}</span>
      </div>
    </div>
  )
}

export default MovieCard