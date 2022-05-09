export interface GenreData {
  id: number;
  name: string;
}

export interface MovieData {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
}
