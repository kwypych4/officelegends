import { Server, Socket } from 'socket.io';
import WsController from './WsController';

export type JoinParams = {
  gameId: number;
};

export type MoveParams = {
  direction: string;
  position: {
    x: number;
    y: number;
  };
};

const registerEventHandler = (event: string, socket: Socket, handler: (args) => void) => {
  socket.on(event, (args) => {
    socket.request.session.reload((err) => {
      if (err) {
        socket.send('Session invalid');
        socket.conn.close();
        return;
      }

      handler(args);
    });
  });
};

export const registerWsRoutes = (io: Server) => {
  io.on('connection', (socket) => {
    socket.request.session.reload((err) => {
      if (err) {
        socket.send('Session invalid');
        socket.conn.close();
        return;
      }

      const controller = new WsController(io, socket);

      registerEventHandler('join', socket, (params: JoinParams) => controller.handleJoin(params));

      registerEventHandler('move', socket, (params: MoveParams) => controller.handleMove(params));

      registerEventHandler('leave', socket, () => controller.handleLeave());

      registerEventHandler('disconnect', socket, () => {
        // user disconnected
      });
    });
  });
};
