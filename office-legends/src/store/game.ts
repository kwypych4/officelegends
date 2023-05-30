import { create } from 'zustand';

type GameStateType = {
  isHallOfFameDoorOpen: boolean;
  isShopOpened: boolean;
  isPlayroomOpened: boolean;
};

export const useGameStore = create<GameStateType>(() => ({
  isHallOfFameDoorOpen: false,
  isShopOpened: false,
  isPlayroomOpened: false,
}));
