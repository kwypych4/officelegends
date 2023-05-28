import { Position } from './Position';

export type Pickup = {
  id: number;
  position: Position;
  type: 'cash' | 'exp';
  amount: number;
};
