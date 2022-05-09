import { GenresAPI } from "./genre";
import { MoviesAPI } from "./movies";

const moviesAPI = new MoviesAPI();
const genresAPI = new GenresAPI();

export { moviesAPI, genresAPI };
