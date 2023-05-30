import { DirectionsType } from 'types';

export type PlayerProps = {
  gameServer: number;
  isControllable: true;
  action?: never;
  username?: never;
};

export type NPCProps = {
  gameServer: number;
  isControllable: false;
  action: Array<DirectionsType | null>;
  username: string;
};
