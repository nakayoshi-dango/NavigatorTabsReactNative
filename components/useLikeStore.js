import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLikeStore = create(
  persist(
    (set, get) => ({
      likedMovies: [], // Array para almacenar las películas con like

      // Obtener las películas que tienen like
      getLikedMovies: () => {
        return get().likedMovies;
      },

      // Agregar una película a los likes
      addLike: (movieId) => {
        const likedMovies = get().likedMovies;
        if (!likedMovies.includes(movieId)) {
          set({ likedMovies: [...likedMovies, movieId] });
        }
      },

      // Eliminar una película de los likes
      removeLike: (movieId) => {
        const likedMovies = get().likedMovies;
        set({ likedMovies: likedMovies.filter(id => id !== movieId) });
      },

      // Verificar si una película tiene like
      isLiked: (movieId) => {
        return get().likedMovies.includes(movieId);
      }
    }),
    {
      name: "like-storage", // Nombre del storage para persistencia
      storage: createJSONStorage(() => AsyncStorage), // Usamos AsyncStorage para persistir
    }
  )
);

export default useLikeStore;
