import type { ProductCardProps } from "@/components/shop/product-card/ProductCard.vue";
import { movieImageAPIURL } from "@/services/api";
import type { GenreData, MovieData } from "@/services/types";

import dayjs from "dayjs";
import localizedFormatDayJs from "dayjs/plugin/localizedFormat";
import localeDayJs from "dayjs/locale/pt-br";

dayjs.extend(localizedFormatDayJs);
dayjs.locale(localeDayJs);

export const findGenre = (id: number, genres: GenreData[]): string => {
  const g = genres.find((genre) => genre.id == id);
  return g ? g.name : "Outro";
};

export const moviesAdapter = (
  movies: MovieData[],
  genres: GenreData[] = []
): ProductCardProps[] => {
  const products: ProductCardProps[] = [];

  movies.forEach((movie) => {
    products.push({
      id: movie.id,
      title: movie.title,
      cover: movieImageAPIURL + "w500" + movie.poster_path,
      date: dayjs(movie.release_date).format("LL").toString(),
      stars: movie.vote_average,
      genre: findGenre(movie.genre_ids[0], genres),
      price: 14.99,
    });
  });

  return products;
};
