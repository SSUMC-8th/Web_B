import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: 'Brearer ${import.meta.env.VITE_TMDB_TOKEN}',
  },
})