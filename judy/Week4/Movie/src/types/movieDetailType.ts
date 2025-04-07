interface IFGenre {
  id: number;
  name: string;
}

interface IFProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface IFProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface IFSpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface IFmovieInfo {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: IFGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IFProductionCompany[];
  production_countries: IFProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: IFSpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IFCast {
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

interface IFCrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface IFCredits {
  id: number;
  cast: IFCast[];
  crew: IFCrew[];
}
