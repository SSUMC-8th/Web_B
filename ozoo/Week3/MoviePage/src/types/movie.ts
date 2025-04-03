export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genres?: { id: number; name: string }[];
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  runtime?: number;
  title: string;
  tagline?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type CastMember = {
  name: string;
  character: string;
  profile_path: string | null;
};

export type CrewMember = {
  name: string;
  job: string;
  profile_path: string | null;
};

export type Credits = {
  cast: CastMember[];
  crew: CrewMember[];
};