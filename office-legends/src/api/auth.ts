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
type RegisterRequest = object;
type RegisterResponse = { message: string };
type RegisterReturn = Promise<RegisterResponse>;
type RegisterProps = {
  username: string;
  password: string;
} & RegisterRequest;

export const register = async (payload: RegisterProps): RegisterReturn => {
  const url = apiUrls.register();

  const params = {
    ...payload,
    avatarId: 1,
  };

  const { data } = await request<RegisterResponse, RegisterRequest>(url, 'POST', {}, params);

  return data;
};

type VerifyRequest = object;
type VerifyResponse = { message: string };
type VerifyReturn = Promise<LoginResponse>;

export const verify = async (): VerifyReturn => {
  const url = apiUrls.verify();

  const { data } = await request<VerifyResponse, VerifyRequest>(url, 'GET');

  return data;
};
