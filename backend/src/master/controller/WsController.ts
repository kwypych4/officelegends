import { Server, Socket } from 'socket.io';
import { IncomingMessage } from 'http';
import { WsJoinParams, WsMoveParams, WsUpdatePlayerParams } from '../WsProtocol';
import { rpcClient } from '../manager/RpcClient';
import { playerUtils } from '../db/DbUtils';
import { gameServerManager } from '../manager/GameServerManager';

export const roomForGameId = (gameId: number): string => `Game${gameId}`;

export default class WsController {
  private readonly socket: Socket;

  private readonly io: Server;

  private readonly req: IncomingMessage;

  constructor(io: Server, socket: Socket) {
    this.io = io;
    this.socket = socket;
    this.req = socket.request;
  }

  handleJoin = async ({ gameServer }: WsJoinParams) => {
    const { playerId } = this.req.session;
    if (!playerId) return;

    const alreadyJoinedServer = this.req.session.gameServer;
    if (alreadyJoinedServer) {
      await this.handleLeave();
    }

    const server = gameServerManager.getServer(gameServer);
    if (!server) return;

    const player = await playerUtils.findPlayerById(playerId);
    if (!player) return;

    const response = await rpcClient.requestJoin(server, {
      id: playerId,
      username: player.username,
      avatar: player.avatar.id,
      skin: player.skin.skin.bitmap,
      money: player.money,
      exp: player.exp,
      credits: player.credits,
    });

    if (!response.success) return;

    this.req.session.gameServer = gameServer;
    this.req.session.save((err) => {
      if (err) return;

      const room = roomForGameId(gameServer);
      this.socket.join(room);
      this.io.in(room).emit('join', response.response);
    });
  };

  handleMove = async (params: WsMoveParams) => {
    const { playerId, gameServer } = this.req.session;
    if (!playerId || !gameServer) return;

    const server = gameServerManager.getServer(gameServer);
    if (!server) return;

    const response = await rpcClient.requestMove(server, playerId, params);
    if (!response.success) return;

    const room = roomForGameId(gameServer);
    this.io.in(room).emit('move', {
      player: playerId,
      direction: params.direction,
      position: params.position,
      money: response.money,
      exp: response.exp,
      coins: response.coins,
    });
  };

  handleLeave = async () => {
    const { playerId, gameServer } = this.req.session;
    if (!playerId || !gameServer) return;

    const server = gameServerManager.getServer(gameServer);
    if (!server) return;

    const response = await rpcClient.requestLeave(server, playerId);
    if (!response.success) return;

    this.req.session.gameServer = undefined;
    this.req.session.save(async (err) => {
      if (err) return;

      const room = roomForGameId(gameServer);
      this.io.in(room).emit('leave', response.response);
      this.socket.leave(room);
    });
  };

  handleUpdatePlayer = async (params: WsUpdatePlayerParams) => {
    const { playerId, gameServer } = this.req.session;
    if (!playerId || !gameServer) return;

    const server = gameServerManager.getServer(gameServer);
    const response = await rpcClient.requestUpdatePlayer(server, playerId, params);

    if (!response.success) return;

    const room = roomForGameId(gameServer);
    this.io.in(room).emit('status', response.response);
  };
}
