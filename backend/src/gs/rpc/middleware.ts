import { createJSONRPCErrorResponse, JSONRPCServerMiddleware } from 'json-rpc-2.0';
import { argv } from '../argv';

const verifyUuidMiddleware: JSONRPCServerMiddleware<void> = async (next, request, serverParams) => {
  const { uuid } = request.params;

  if (!uuid || uuid !== argv.uuid) {
    return createJSONRPCErrorResponse(request.id, 401, "UUID doesn't match", { success: false });
  }

  return next(request, serverParams);
};

export { verifyUuidMiddleware };
