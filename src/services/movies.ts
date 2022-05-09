import api, { defaultMovieAPIParams, movieAPIBaseURL } from "./api";
import type { MovieData } from "./types";

api.defaults.baseURL = movieAPIBaseURL;

export interface MovieAPIData {
  results: MovieData[];
  page: number;
}

export class MoviesAPI {
  public async popular(page = 1): Promise<MovieAPIData> {
    return (
      await api.get("/movie/popular", {
        params: {
          ...defaultMovieAPIParams,
          page,
        },
      })
    ).data as MovieAPIData;
  }

  public async discover(page = 1): Promise<MovieAPIData> {
    return (
      await api.get("/discover/movie", {
        params: {
          ...defaultMovieAPIParams,
          sort_by: "popularity.desc",
          page,
        },
      })
    ).data as MovieAPIData;
  }
}
