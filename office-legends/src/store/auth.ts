import { create } from 'zustand';

type AuthStateType = {
  isLogged: boolean;
};

export const useAuthStore = create<AuthStateType>(() => ({
  isLogged: false,
}));
