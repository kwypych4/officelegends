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
import { gameServerManager } from './GameServerManager';
import { MoveParams } from '../WsProtocol';

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

const requestJoin = (gameId: number, playerData: JoinPlayerData): PromiseLike<JoinResponse> => {
  const gameServer = gameServerManager.getServer(gameId);
  const { address } = gameServer;

  const body: JoinRequest = {
    uuid: gameServer.uuid,
    player: playerData,
  };
  return client(address).request('join', body);
};

const requestMove = (gameId: number, playerId, { direction, position }: MoveParams): PromiseLike<MoveResponse> => {
  const gameServer = gameServerManager.getServer(gameId);
  const { address } = gameServer;

  const body: MoveRequest = {
    uuid: gameServer.uuid,
    playerId,
    direction,
    position,
  };

  return client(address).request('move', body);
};

const requestLeave = (playerId: number, gameId: number): PromiseLike<LeaveResponse> => {
  const gameServer = gameServerManager.getServer(gameId);
  const { address } = gameServer;

  const body: LeaveRequest = {
    uuid: gameServer.uuid,
    playerId,
  };
  return client(address).request('leave', body);
};

const rpcClient = { requestJoin, requestMove, requestLeave };

export { rpcClient };
