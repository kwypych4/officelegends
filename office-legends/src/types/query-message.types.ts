type UserTypedMessages = {
  onSuccess?: string;
  onError?: string;
  useResponseErrorMessage?: never;
};

type ResponseMessagesError = {
  onSuccess?: string;
  onError?: never;
  useResponseErrorMessage?: true;
};

export type MessagesTypes = UserTypedMessages | ResponseMessagesError;
