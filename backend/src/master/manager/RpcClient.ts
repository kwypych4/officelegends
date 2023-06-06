import { JSONRPCClient } from 'json-rpc-2.0';
import {
  AddCoinRequest,
  AddCoinResponse,
  Coin,
  GetStatusRequest,
  GetStatusResponse,
  JoinPlayerData,
  JoinRequest,
  JoinResponse,
  LeaveRequest,
  LeaveResponse,
  MoveRequest,
  MoveResponse,
  UpdatePlayerRequest,
  UpdatePlayerResponse,
} from '../../common/RpcProtocol';
import { GameServer } from './GameServerManager';
import { WsMoveParams, WsUpdatePlayerParams } from '../WsProtocol';

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

const requestUpdatePlayer = (
  gameServer: GameServer,
  playerId: number,
  { money, exp, credits }: WsUpdatePlayerParams
): PromiseLike<UpdatePlayerResponse> => {
  const body: UpdatePlayerRequest = {
    uuid: gameServer.uuid,
    playerId,
    money,
    exp,
    credits,
  };

  return client(gameServer.address).request('updatePlayer', body);
};

const requestLeave = (gameServer: GameServer, playerId: number): PromiseLike<LeaveResponse> => {
  const body: LeaveRequest = {
    uuid: gameServer.uuid,
    playerId,
  };
  return client(gameServer.address).request('leave', body);
};

const requestSpawnCoin = (gameServer: GameServer, coin: Coin): PromiseLike<AddCoinResponse> => {
  const body: AddCoinRequest = {
    uuid: gameServer.uuid,
    coin,
  };
  return client(gameServer.address).request('spawnCoin', body);
};

const requestStatus = (gameServer: GameServer): PromiseLike<GetStatusResponse> => {
  const body: GetStatusRequest = {
    uuid: gameServer.uuid,
  };

  return client(gameServer.address).request('status', body);
};

const rpcClient = { requestJoin, requestMove, requestLeave, requestUpdatePlayer, requestSpawnCoin, requestStatus };

export { rpcClient };
