import { Position } from './Position';

export type ConnectedPlayer = {
  id: number;
  nickname: string;
  skin: number;
  money: number;
  exp: number;
  position: Position;
};
