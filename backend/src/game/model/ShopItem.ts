import { ItemType } from './ItemType';

export type ShopItem = {
  id: number;
  bitmap?: string;
  style?: number;
  itemType: ItemType;
  name: string;
  cost: number;
  minExp: number;
};
