import { ChangePlayerResponseType } from 'types';
import { apiUrls } from 'urls';
import { request } from 'utils';

type ChangePlayerRequest = {
  credits?: number;
  money?: number;
  exp?: number;
};
type ChangePlayerResponse = ChangePlayerResponseType;
type ChangePlayerReturn = Promise<ChangePlayerResponse>;
type ChangePlayerProps = ChangePlayerRequest;

export const updatePlayer = async (payload: ChangePlayerProps): ChangePlayerReturn => {
  const url = apiUrls.player();

  const { data } = await request<ChangePlayerResponse, ChangePlayerRequest>(url, 'PATCH', {}, payload);

  return data;
};
