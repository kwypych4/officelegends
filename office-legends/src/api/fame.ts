import { apiUrls } from 'urls';
import { request } from 'utils';

type FameRequest = object;
type FameResponse = {
  avatar_id: number;
  credits: number;
  exp: number;
  id: number;
  money: number;
  username: string;
}[];
type FameReturn = Promise<FameResponse>;

export const getList = async (): FameReturn => {
  const url = apiUrls.fame();

  const { data } = await request<FameResponse, FameRequest>(url, 'GET');

  return data;
};
