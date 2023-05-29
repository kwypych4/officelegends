import { DirectionsType } from './directions.types';

export type WebsocketRequestType = {
  direction: DirectionsType;
  position: {
    x: number;
    y: number;
  };
};
export type WebsocketResponseType = {
  username: string;
  id: number;
  position: {
    x: number;
    y: number;
  };
  action: Array<DirectionsType | null>;
  image: number;
}[];