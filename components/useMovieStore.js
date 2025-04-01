import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useMovieStore = create(
  persist(
    (set, get) => ({
      movies: [],
      movieKeys: [],

      setMovies: (newMovies) => {
        set({ movies: newMovies });
      },

      setMovieKeys: (keys) => {
        set({ movieKeys: keys });
      },

      mergeMovies: (apiMovies, apiKeys) => {
        const storedMovies = get().movies;
        const storedKeys = get().movieKeys;

        // Filtrar películas que no están en la API
        const mergedMovies = [...storedMovies, ...apiMovies.filter(movie => !storedMovies.some(m => m.id === movie.id))];
        const mergedKeys = [...storedKeys, ...apiKeys.filter(key => !storedKeys.includes(key))];

        set({ movies: mergedMovies, movieKeys: mergedKeys });
      }
    }),
    {
      name: "movie-storage",
      getStorage: () => AsyncStorage,
    }
  )
);

export default useMovieStore;
