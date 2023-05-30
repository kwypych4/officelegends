import { DirectionsType } from 'types';

export type NPCPlayerProps = {
  action: Array<DirectionsType | null>;
  username: string;
  world: number;
};
