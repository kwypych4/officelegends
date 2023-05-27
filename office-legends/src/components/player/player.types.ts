import { DirectionsType } from 'types';

export type PlayerProps = {
  isControllable: true;
  action?: never;
  username?: never;
};

export type NPCProps = {
  isControllable: false;
  action: Array<DirectionsType | null>;
  username: string;
};
