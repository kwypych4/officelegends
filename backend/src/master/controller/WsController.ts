import { Server, Socket } from 'socket.io';
import { IncomingMessage } from 'http';
import { JoinParams, MoveParams } from '../WsProtocol';
import { rpcClient } from '../manager/RpcClient';
import { playerUtils } from '../db/DbUtils';

const roomForGameId = (gameId: number): string => `Game${gameId}`;

export default class WsController {
  private readonly socket: Socket;

  private readonly io: Server;

  private readonly req: IncomingMessage;

  constructor(io: Server, socket: Socket) {
    this.io = io;
    this.socket = socket;
    this.req = socket.request;
  }

  handleJoin = async ({ gameId }: JoinParams) => {
    const { playerId } = this.req.session;
    if (!playerId) return;

    const player = await playerUtils.findPlayerById(playerId);
    if (!player) return;

    const response = await rpcClient.requestJoin(gameId, {
      id: playerId,
      nickname: player.username,
      avatar: player.avatar.bitmap,
      skin: player.skin.skin.bitmap,
      money: player.money,
      exp: player.exp,
    });

    if (!response.success) return;

    this.req.session.gameId = gameId;
    this.req.session.save((err) => {
      if (err) return;

      const room = roomForGameId(gameId);
      this.socket.join(room);
      this.io.in(room).emit('join', response.response);
    });
  };

  handleMove = async (params: MoveParams) => {
    const { playerId, gameId } = this.req.session;

    if (!playerId || !gameId) return;

    const response = await rpcClient.requestMove(gameId, playerId, params);

    if (!response.success) return;

    const room = roomForGameId(gameId);
    this.io.in(room).emit('move', {
      player: playerId,
      direction: params.direction,
      position: params.position,
    });
  };

  handleLeave = async () => {
    const { playerId, gameId } = this.req.session;

    if (!playerId || !gameId) return;

    const response = await rpcClient.requestLeave(playerId, gameId);

    if (!response.success) return;

    this.req.session.gameId = undefined;
    this.req.session.save(async (err) => {
      if (err) return;

      const updateResult = await playerUtils.updatePlayer(playerId, {
        exp: response.removedPlayer.exp,
        money: response.removedPlayer.money,
      });

      if (!updateResult) return;

      const room = roomForGameId(gameId);
      this.io.in(room).emit('leave', response.response);
      this.socket.leave(room);
    });
  };
}
