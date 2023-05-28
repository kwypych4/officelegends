import { Face } from './Face';
import { InventoryItem } from './InventoryItem';

export type Player = {
  id: number;
  username: string;
  money: number;
  exp: number;
  face: Face;
  shirt: InventoryItem;
  trousers: InventoryItem;
  nicknameStyle: InventoryItem;
};
