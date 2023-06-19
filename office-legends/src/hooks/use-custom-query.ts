import { App } from 'antd';
import { AxiosError } from 'axios';
import { QueryFunction, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from 'react-query';
import { MessagesTypes, QueryKeys } from 'types';

type TCustomQueryOptions = {
  message?: MessagesTypes;
  invalidateQueryKey?: Array<QueryKeys>;
  mutationKey?: TQueryKey;
};
type TQueryKey = [QueryKeys, any?] | QueryKeys;
type TQueryFunction<T> = QueryFunction<T, TQueryKey>;
type TQueryError = AxiosError<{ message: string }>;
type TQueryOptions<T> = UseQueryOptions<T, TQueryError, T, TQueryKey> & TCustomQueryOptions;
type TQueryResult<T> = UseQueryResult<T, TQueryError>;

export const useCustomQuery = <QueryReturnType>(
  queryKey: TQueryKey,
  queryFn: TQueryFunction<QueryReturnType>,
  options?: TQueryOptions<QueryReturnType>
): TQueryResult<QueryReturnType> => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
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
        notification.error({ message: error.response?.data.message });
      }
    },
    retry: false,
    enabled: options?.enabled,
  });
};
