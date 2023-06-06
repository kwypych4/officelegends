import { JSONRPCServer } from 'json-rpc-2.0';
import { gameController } from '../controller/GameController';
import { AddCoinRequest, JoinRequest, LeaveRequest, MoveRequest, UpdatePlayerRequest } from '../../common/RpcProtocol';

const registerRpcRoutes = (server: JSONRPCServer) => {
  server.addMethod('join', ({ player }: JoinRequest) => gameController.joinPlayer(player));

  server.addMethod('move', ({ playerId, position, direction }: MoveRequest) =>
    gameController.movePlayer(playerId, position, direction)
  );

  server.addMethod('leave', ({ playerId }: LeaveRequest) => gameController.removePlayer(playerId));

  server.addMethod('updatePlayer', (request: UpdatePlayerRequest) => gameController.updatePlayer(request));

  server.addMethod('spawnCoin', ({ coin }: AddCoinRequest) => gameController.addCoin(coin));

  server.addMethod('status', () => gameController.getStatus());
};

export { registerRpcRoutes };
