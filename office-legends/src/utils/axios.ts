import axios, { AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': 'true',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  },
  withCredentials: true,
});

export const request = <T, Y>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  params?: any,
  data?: any,
  withAttachments?: boolean
): Promise<AxiosResponse<T, Y>> => {
  return axiosInstance({
    method,
    url,
    params,
    data,
    headers: {
      ...(withAttachments && { 'Content-Type': 'multipart/form-data' }),
    },
    formSerializer: { indexes: null },
  });
};
