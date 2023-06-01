import { Position } from '../../common/RpcProtocol';

export type Pickup = {
  id: number;
  position: Position;
  type: 'cash' | 'exp';
  amount: number;
};
