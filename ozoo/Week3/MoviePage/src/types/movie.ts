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

type Genre = {
  id: number;
  name: string;

}

type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
}

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
}


export type MovieDetailResponse = {
    "adult": boolean,
    "backdrop_path": string,
    "belongs_to_collection": {
      "id": number,
      "name": string,
      "poster_path": string,
      "backdrop_path": string
    },
    "budget": number,
    "genres": Genre[],
    "homepage": string,
    "id": number,
    "imdb_id": string,
    "origin_country": string[],
    "original_language": string,
    "original_title": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "production_companies": ProductionCompany[],
    "production_countries": ProductionCountry[],
    "release_date": string,
    "revenue": number,
    "runtime": number,
    "spoken_languages": SpokenLanguage[],
    "status": string,
    "tagline": string,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
  }
