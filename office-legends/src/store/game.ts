import io, { Socket } from 'socket.io-client';
import { ClientToServerEvents, PlayerProperties, ServerToClientEvents } from 'types';
import { create } from 'zustand';

type GameStateType = {
  isHallOfFameDoorOpen: boolean;
  isShopOpened: boolean;
  isPlayroomOpened: boolean;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  playersList: PlayerProperties[] | null;
};

export const useGameStore = create<GameStateType>(() => ({
  isHallOfFameDoorOpen: false,
  isShopOpened: false,
  isPlayroomOpened: false,
  socket: io('localhost:3000', {
    transports: ['websocket'],
    autoConnect: true,
  }),
  playersList: null,
}));
