import { Position } from './Position';

export type ConnectedPlayer = {
  id: number;
  username: string;
  avatar: string;
  skin: string;
  money: number;
  exp: number;
  position: Position;
};
