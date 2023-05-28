import { Server, Socket } from 'socket.io';
import { IncomingMessage } from 'http';
import { JoinParams, MoveParams } from './wsRoutes';

const roomFromGameId = (gameId: number): string => `Game${gameId}`;

export default class WsController {
  private socket: Socket;

  private io: Server;

  private req: IncomingMessage;

  constructor(io: Server, socket: Socket) {
    this.io = io;
    this.socket = socket;
    this.req = socket.request;
  }

  handleJoin = ({ gameId }: JoinParams) => {
    const { playerId } = this.req.session;
    if (!playerId) return;

    this.req.session.gameId = gameId;
    this.req.session.save((err) => {
      if (err) {
        this.socket.send('Failed to update session data');
        return;
      }

      const room = roomFromGameId(gameId);

      this.socket.join(room);
      this.io.in(room).emit('join', { playerId, gameId });
      // TODO: Cache player info, contact GS
    });
  };

  handleMove = ({ x, y }: MoveParams) => {
    const { playerId, gameId } = this.req.session;

    if (!playerId || !gameId) {
      this.socket.send('Invalid session');
      return;
    }

    const room = roomFromGameId(gameId);

    this.io.in(room).emit('move', { player: playerId, x, y });

    // TODO: Relay event to the correct GS
  };

  handleLeave = () => {
    const { playerId, gameId } = this.req.session;

    if (!playerId || !gameId) {
      this.socket.send('Invalid session');
      return;
    }

    const room = roomFromGameId(gameId);

    this.io.in(room).emit('leave', { playerId, gameId });
    this.socket.leave(room);

    // TODO: Remove player from the game
  };
}
