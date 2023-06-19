import { UserStatus } from 'types';
import { apiUrls } from 'urls';
import { request } from 'utils';

type LoginRequest = {
  username: string;
  password: string;
};
type LoginResponse = UserStatus;
type LoginReturn = Promise<LoginResponse>;
type LoginProps = LoginRequest;

export const login = async (payload: LoginProps): LoginReturn => {
  const url = apiUrls.login();

  const { data } = await request<LoginResponse, LoginRequest>(url, 'POST', {}, payload);

  return data;
};
type RegisterRequest = {
  username: string;
  password: string;
  avatarId: number;
};
type RegisterResponse = UserStatus;
type RegisterReturn = Promise<RegisterResponse>;
type RegisterProps = RegisterRequest;

export const register = async (payload: RegisterProps): RegisterReturn => {
  const url = apiUrls.register();

  const params = {
    ...payload,
  };

  const { data } = await request<RegisterResponse, RegisterRequest>(url, 'POST', {}, params);

  return data;
};

type VerifyRequest = object;
type VerifyResponse = UserStatus;
type VerifyReturn = Promise<VerifyResponse>;

export const verify = async (): VerifyReturn => {
  const url = apiUrls.verify();

  const { data } = await request<VerifyResponse, VerifyRequest>(url, 'GET');

  return data;
};

type LogoutRequest = object;
type LogoutResponse = object;
type LogoutReturn = Promise<LogoutResponse>;

export const logout = async (): LogoutReturn => {
  const url = apiUrls.logout();

  const { data } = await request<LogoutResponse, LogoutRequest>(url, 'POST');

  return data;
};
