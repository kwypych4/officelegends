import { App } from 'antd';
import { AxiosError } from 'axios';
import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from 'react-query';
import { MessagesTypes, MutationKeys, QueryKeys } from 'types';

type TCustomQueryOptions = {
  message?: MessagesTypes;
  invalidateQueryKey?: TQueryKeys;
  mutationKey?: TMutationKey;
};
type TMutationKey = [MutationKeys, any] | MutationKeys;
type TQueryKeys = Array<QueryKeys>;
type TMutationFunction<T, Y> = MutationFunction<T, Y>;
type TMutationError = AxiosError<{ error: string }>;
type TMutationOptions<T, Y> = UseMutationOptions<
  T,
  TMutationError,
  Y,
  UseMutationOptions<T, TMutationError, Y, UseMutationOptions<T, TMutationError, Y, undefined>>
> &
  TCustomQueryOptions;
type TQueryResult<T, Y> = UseMutationResult<
  T,
  TMutationError,
  Y,
  UseMutationOptions<T, TMutationError, Y, UseMutationOptions<T, TMutationError, Y, undefined>>
>;

export const useCustomMutation = <QueryReturnType, QueryRequestType = void>(
  mutationFn: TMutationFunction<QueryReturnType, QueryRequestType>,
  options?: TMutationOptions<QueryReturnType, QueryRequestType>
): TQueryResult<QueryReturnType, QueryRequestType> => {
  const { notification } = App.useApp();
  const queryClient = useQueryClient();
  return useMutation(mutationFn, {
    onSuccess: (success, variables, context) => {
      if (options?.invalidateQueryKey) {
        options.invalidateQueryKey.map((key) => queryClient.invalidateQueries({ queryKey: key }));
      }
      if (options?.message?.onSuccess) {
        notification.success({ message: options.message.onSuccess });
      }
      if (options?.onSuccess) {
        options.onSuccess(success, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
      if (options?.invalidateQueryKey) {
        options.invalidateQueryKey.map((key) => queryClient.invalidateQueries({ queryKey: key }));
      }
      if (options?.message?.onError) {
        notification.error({ message: options.message.onError });
      }
      if (options?.message?.useResponseErrorMessage) {
        notification.error({ message: error.response?.data.error });
      }
    },
  });
};
