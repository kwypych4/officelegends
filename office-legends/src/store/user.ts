import { UserStatus } from 'types';
import { create } from 'zustand';

type UserStateType = UserStatus;

export const useUserStore = create<UserStateType>(() => ({
  avatar: null,
  exp: null,
  gameServer: null,
  id: null,
  money: null,
  skin: null,
  username: null,
}));
