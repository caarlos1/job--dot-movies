import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

export default api;

export const movieAPIBaseURL = import.meta.env.VITE_MOVIE_API_URL;
export const movieImageAPIURL = import.meta.env.VITE_MOVIE_IMAGE_API_URL;
export const movieAPIKey = import.meta.env.VITE_MOVIE_API_KEY;

export const defaultMovieAPIParams = {
  api_key: movieAPIKey,
  language: "pt-BR",
};
