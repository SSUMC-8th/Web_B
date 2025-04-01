export interface IFmovieGenres {
  id: number;
  name: string;
}

export interface IFmovieCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IFmovieInfo {
  id: number;
  backdrop_path: string;
  genres: IFmovieGenres[];
  original_title: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  production_companies: IFmovieCompany[];
  vote_average: number;
}
