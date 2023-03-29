import { JSONRPCServer } from 'json-rpc-2.0';

export const registerRoutes = (server: JSONRPCServer) => {
  server.addMethod('test', () => 'dupa');
  server.addMethod('chat', ({ text }) => text);

  // TODO: Implement actual methods
};
