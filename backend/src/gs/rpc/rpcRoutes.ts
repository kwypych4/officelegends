import { JSONRPCServer } from 'json-rpc-2.0';

const registerRpcRoutes = (server: JSONRPCServer) => {
  server.addMethod('join', () => {
    // Join
  });

  server.addMethod('move', () => {
    // Move
  });

  server.addMethod('leave', () => {
    // Leave
  });
};

export { registerRpcRoutes };
