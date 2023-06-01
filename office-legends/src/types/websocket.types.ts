import { DirectionsType } from './directions.types';
import { PlayerProperties } from './player.types';

export type MoveEmitType = {
  direction: DirectionsType;
  position: {
    x: number;
    y: number;
  };
};
export type MoveResponseType = {
  player: number;
  direction: DirectionsType;
  position: {
    x: number;
    y: number;
  };
};

export type ServerToClientEvents = {
  join: ({ playersList, gameServer }: { playersList: PlayerProperties[]; gameServer: number }) => void;
  leave: ({ playersList, gameServer }: { playersList: PlayerProperties[]; gameServer: number }) => void;
  move: (response: MoveResponseType) => void;
};

export type ClientToServerEvents = {
  join: ({ gameServer }: { gameServer: number | null }) => void;
  leave: () => void;
  move: (move: MoveEmitType) => void;
};
