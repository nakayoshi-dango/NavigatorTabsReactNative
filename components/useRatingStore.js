import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRatingStore = create(
  persist(
    (set, get) => ({
      ratings: {},

      // Añade o actualiza la valoración de una película para un usuario
      addRating: (email, movieId, ratingData) =>
        set((state) => ({
          ratings: {
            ...state.ratings,
            [email]: {
              ...state.ratings[email], // Conserva las valoraciones anteriores del usuario
              [movieId]: ratingData,   // Añade o actualiza la valoración de la película
            },
          },
        })),

      // Devuelve la valoración de una película concreta de un usuario
      getRating: (email, movieId) => {
        const userRatings = get().ratings[email];
        return userRatings ? userRatings[movieId] : null;
      },

      // Devuelve todas las valoraciones de todos los usuarios
      getRatings: () => get().ratings,
    }),
    {
      name: "ratings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
