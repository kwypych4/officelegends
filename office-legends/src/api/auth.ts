import { apiUrls } from 'urls';
import { request } from 'utils';

type LoginRequest = object;
type LoginResponse = { message: string };
type LoginReturn = Promise<LoginResponse>;
type LoginProps = {
  username: string;
  password: string;
} & LoginRequest;

export const login = async (payload: LoginProps): LoginReturn => {
  const url = apiUrls.login();

  const { data } = await request<LoginResponse, LoginRequest>(url, 'POST', {}, payload);

  return data;
};
