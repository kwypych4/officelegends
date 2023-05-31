import { JSONRPCClient } from 'json-rpc-2.0';
import {
  JoinPlayerData,
  JoinRequest,
  JoinResponse,
  LeaveRequest,
  LeaveResponse,
  MoveRequest,
  MoveResponse,
} from '../../common/RpcProtocol';
import { GameServer } from './GameServerManager';
import { WsMoveParams } from '../WsProtocol';

const client = (address: string): JSONRPCClient => {
  const c = new JSONRPCClient<void>((request) => {
    fetch(address, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((res) => c.receive(res));
      }
      if (request.id !== undefined) {
        return Promise.reject(new Error(response.statusText));
      }
      return Promise.reject(new Error('Bad request'));
    });
  });
  return c;
};

const requestJoin = (gameServer: GameServer, playerData: JoinPlayerData): PromiseLike<JoinResponse> => {
  const body: JoinRequest = {
    uuid: gameServer.uuid,
    player: playerData,
  };
  return client(gameServer.address).request('join', body);
};

const requestMove = (
  gameServer: GameServer,
  playerId,
  { direction, position }: WsMoveParams
): PromiseLike<MoveResponse> => {
  const body: MoveRequest = {
    uuid: gameServer.uuid,
    playerId,
    direction,
    position,
  };

  return client(gameServer.address).request('move', body);
};

const requestLeave = (gameServer: GameServer, playerId: number): PromiseLike<LeaveResponse> => {
  const body: LeaveRequest = {
    uuid: gameServer.uuid,
    playerId,
  };
  return client(gameServer.address).request('leave', body);
};

const rpcClient = { requestJoin, requestMove, requestLeave };

export { rpcClient };
