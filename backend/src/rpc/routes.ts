import { JSONRPCServer } from 'json-rpc-2.0';
import { RpcServerParams } from './server';
import { activeGames, startGame } from '../game/Game';

const registerRpcRoutes = (server: JSONRPCServer<RpcServerParams>) => {
  server.addMethod('startGame', ({ name, map }) => {
    startGame(name, map);
  });

  server.addMethod('listGames', () => activeGames());

  server.addMethod('join', ({ player }, serverParams: RpcServerParams) => {
    serverParams.game.onPlayerJoined(player);
  });

  server.addMethod('leave', ({ player }, serverParams: RpcServerParams) => {
    serverParams.game.onPlayerLeft(player);
  });

  server.addMethod('test', () => 'dupa');
  server.addMethod('chat', ({ message }, serverParams: RpcServerParams) => {
    serverParams.game.onChatMessage(message, serverParams.player);
    return serverParams.game.getChat();
  });

  // TODO: Implement actual methods
};

export default registerRpcRoutes;
