import io, { Socket } from 'socket.io-client';
import { ClientToServerEvents, PlayerProperties, ServerToClientEvents } from 'types';
import { create } from 'zustand';

import { useUserStore } from './user';

type GameStateType = {
  isHallOfFameDoorOpen: boolean;
  isShopOpened: boolean;
  isPlayroomOpened: boolean;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  playersList: PlayerProperties[] | null;
  setPlayersList: (playersList: PlayerProperties[], gameServerLeft: number) => void;
};

export const useGameStore = create<GameStateType>((set) => ({
  isHallOfFameDoorOpen: false,
  isShopOpened: false,
  isPlayroomOpened: false,
  socket: io(import.meta.env.VITE_APP_WEBSOCKET, {
    transports: ['websocket'],
    autoConnect: false,
  }),
  playersList: null,
  setPlayersList: (playersList: PlayerProperties[], gameServerLeft: number) =>
    set((state) => {
      const { gameServer } = useUserStore.getState();

      if (gameServer === gameServerLeft) return { playersList };

      return { playersList: state.playersList };
    }),
}));
