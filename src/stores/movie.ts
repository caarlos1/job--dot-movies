import type { CartItem } from "@/components/shop/cart-list/CartList.vue";
import type { ProductCardProps } from "@/components/shop/product-card/ProductCard.vue";
import { genresAPI, moviesAPI } from "@/services";
import type { GenreData, MovieData } from "@/services/types";
import { moviesAdapter } from "@/util/adapters/movies";
import { defineStore } from "pinia";

const favoriteMovies = (movies: ProductCardProps[], favorites: CartItem[]) => {
  return movies.map((m) => {
    const favorited = favorites.find((f) => f.id == m.id);
    if (favorited) m.liked = true;
    return m;
  });
};

export const useMovieStore = defineStore({
  id: "movie",
  state: () => ({
    genres: [] as GenreData[],
    movies: [] as ProductCardProps[],
    page: 0,
    search: "",
    firstRequest: true,
  }),

  getters: {
    getMovies: (state) => state.movies,
  },

  actions: {
    async requestMovies(
      favorites: CartItem[] = [],
      search = "",
      manual = false
    ) {
      if (manual || this.firstRequest) {
        this.firstRequest = false;

        if (search && this.search != search) this.firstRequest = true;
        else {
          if (this.search) this.firstRequest = true;
        }

        try {
          if (this.genres.length == 0) this.genres = await genresAPI.all();
          const moviesReq: MovieData[] = [];

          if (search) {
            if (this.search != search) {
              this.page = 0;
              this.movies = [];
              this.search = search;
            }

            this.page++;
            moviesReq.push(
              ...(await moviesAPI.search(search, this.page)).results
            );
          } else {
            if (this.search) {
              this.page = 0;
              this.movies = [];
              this.search = "";
            }

            this.page++;
            moviesReq.push(...(await moviesAPI.popular(this.page)).results);
          }

          this.movies.push(
            ...favoriteMovies(moviesAdapter(moviesReq, this.genres), favorites)
          );
        } catch (err) {
          console.log(err);
        }
      }
    },

    toogleMovieFavorite(movieId: number, state: boolean) {
      const index = this.movies.findIndex((p) => p.id == movieId);
      if (index != -1) this.movies[index].liked = state;
    },
  },
});
