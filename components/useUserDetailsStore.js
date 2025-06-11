import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserDetailsStore = create(
  persist(
    (set, get) => ({
      displayName: '',
      surname: '',
      phoneNumber: '',
      genderVist: '',
      dateOfBirth: '',

      // Establece los detalles del usuario
      setUserDetails: (details) =>
        set((state) => ({
          displayName: details.displayName,
          surname: details.surname,
          phoneNumber: details.phoneNumber,
          genderVist: details.genderVist,
          dateOfBirth: details.dateOfBirth,
        })),

      // Devuelve los detalles del usuario
      getUserDetails: () => ({
        displayName: get().displayName,
        surname: get().surname,
        phoneNumber: get().phoneNumber,
        genderVist: get().genderVist,
        dateOfBirth: get().dateOfBirth,
      }),
    }),
    {
      name: 'user-details-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
