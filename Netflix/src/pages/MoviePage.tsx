import { useEffect } from 'react'

export default function MoviePage() : React.ReactElement {
  useEffect(():void => {
    const fetchMovies = async() : Promise<void> => {
      const response = fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
      );
      console.log(response);
    };
    fetchMovies(); 
  },[]);
  return <div>Movie page</div>
}