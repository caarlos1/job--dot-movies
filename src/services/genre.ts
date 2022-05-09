import api, { defaultMovieAPIParams, movieAPIBaseURL } from "./api";
import type { GenreData } from "./types";

api.defaults.baseURL = movieAPIBaseURL;

export interface GenreAPIData {
  genres: GenreData[];
}

export class GenresAPI {
  public async all(): Promise<GenreData[]> {
    return (
      (
        await api.get("/genre/movie/list", {
          params: {
            ...defaultMovieAPIParams,
          },
        })
      ).data as GenreAPIData
    ).genres;
  }
}
