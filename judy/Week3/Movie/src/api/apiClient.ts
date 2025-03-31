import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,
  },
});
