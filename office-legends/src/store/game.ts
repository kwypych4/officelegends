import { create } from 'zustand';

type GameStateType = {
  isHallOfFameDoorOpen: boolean;
};

export const useGameStore = create<GameStateType>(() => ({
  isHallOfFameDoorOpen: false,
}));
