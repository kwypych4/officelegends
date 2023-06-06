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
  coins: CoinResponseType[];
};

export type StatusResponseType = {
  player: {
    money: number;
    exp: number;
    credits: number;
  };
};

export type CoinResponseType = {
  amount: number;
  position: {
    x: number;
    y: number;
  };
};
export type UpdatePlayerEmitType = {
  money?: number;
  exp?: number;
  credits?: number;
};

export type ServerToClientEvents = {
  join: ({
    playersList,
    gameServer,
    coinList,
  }: {
    playersList: PlayerProperties[];
    gameServer: number;
    coinList: CoinResponseType[];
  }) => void;
  leave: ({ playersList, gameServer }: { playersList: PlayerProperties[]; gameServer: number }) => void;
  move: (response: MoveResponseType) => void;
  status: ({ player }: StatusResponseType) => void;
  coin: (coins: CoinResponseType[]) => void;
};

export type ClientToServerEvents = {
  join: ({ gameServer }: { gameServer: number | null }) => void;
  leave: () => void;
  move: (move: MoveEmitType) => void;
  updatePlayer: ({ money, exp, credits }: UpdatePlayerEmitType) => void;
};
