import { App } from 'antd';
import { AxiosError } from 'axios';
import { QueryFunction, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MessagesTypes, QueryKeys } from 'types';
import { appRoutes } from 'urls';

type TCustomQueryOptions = {
  message?: MessagesTypes;
  invalidateQueryKey?: Array<QueryKeys>;
  mutationKey?: TQueryKey;
};
type TQueryKey = [QueryKeys, any?] | QueryKeys;
type TQueryFunction<T> = QueryFunction<T, TQueryKey>;
type TQueryError = AxiosError<{ error: string }>;
type TQueryOptions<T> = UseQueryOptions<T, TQueryError, T, TQueryKey> & TCustomQueryOptions;
type TQueryResult<T> = UseQueryResult<T, TQueryError>;

export const useCustomQuery = <QueryReturnType>(
  queryKey: TQueryKey,
  queryFn: TQueryFunction<QueryReturnType>,
  options?: TQueryOptions<QueryReturnType>
): TQueryResult<QueryReturnType> => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useQuery(queryKey, queryFn, {
    onSuccess: (success) => {
      if (options?.onSuccess) {
        options?.onSuccess(success);
      }
      if (options?.invalidateQueryKey) {
        queryClient.invalidateQueries({ queryKey: options?.invalidateQueryKey });
      }
      if (options?.message?.onSuccess) {
        notification.success({ message: options.message.onSuccess });
      }
    },
    onError: (error) => {
      if (error.response?.status === 401 && error.response?.data.error === 'You are not logged in!') {
        notification.warning({ message: error.response.data?.error });
      }

      if (error.response?.status === 403 && error.response?.data.error === 'Your session has expired!') {
        notification.warning({ message: error.response.data?.error });
        navigate(appRoutes.auth.login);
      } else if (error.response?.status === 403) {
        navigate(appRoutes.error.forbidden);
      }
      if (error.response?.status === 404) {
        navigate(appRoutes.error.notFound);
      }

      if (options?.onError) {
        options?.onError(error);
      }
      if (options?.invalidateQueryKey) {
        queryClient.invalidateQueries({ queryKey: options.invalidateQueryKey });
      }
      if (options?.message?.onError) {
        notification.error({ message: options.message.onError });
      }
      if (options?.message?.useResponseErrorMessage) {
        notification.error({ message: error.response?.data.error });
      }
    },
    retry: false,
    enabled: options?.enabled,
  });
};
