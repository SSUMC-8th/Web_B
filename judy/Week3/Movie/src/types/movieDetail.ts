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

export interface IFCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface IFCrew {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface IFCredits {
  id: number;
  cast: IFCast[];
  crew: IFCrew[];
}
