import { JSONRPCServer } from 'json-rpc-2.0';
import { gameController } from '../controller/GameController';
import { JoinRequest, LeaveRequest, MoveRequest } from '../../common/RpcProtocol';

const registerRpcRoutes = (server: JSONRPCServer) => {
  server.addMethod('join', ({ player }: JoinRequest) => gameController.joinPlayer(player));

  server.addMethod('move', ({ playerId, position, direction }: MoveRequest) =>
    gameController.movePlayer(playerId, position, direction)
  );

  server.addMethod('leave', ({ playerId }: LeaveRequest) => gameController.removePlayer(playerId));
};

export { registerRpcRoutes };
