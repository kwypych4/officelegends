import { Server, Socket } from 'socket.io';

type JoinParams = {
  gameId: number;
};

type MoveParams = {
  x: number;
  y: number;
};

const roomFromGameId = (gameId: number) => `Game${gameId}`;

const handleEvent = (event: string, socket: Socket, handler: (args) => void) => {
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

const internalRegisterWsRoutes = (socket: Socket) => {
  const req = socket.request;

  handleEvent('join', socket, ({ gameId }: JoinParams) => {
    const player = req.session.playerId;
    if (!player) return;

    socket.join(roomFromGameId(gameId));

    console.log(`Joined player ${player} to room ${gameId}`);

    // TODO: Do all the stuff
  });

  handleEvent('move', socket, ({ x, y }: MoveParams) => {
    // TODO: move the player
  });

  handleEvent('leave', socket, () => {
    // TODO: remove player from the game
    // socket.leave(roomFromGameId());
  });

  handleEvent('disconnect', socket, () => {
    // user disconnected
  });
};

export const registerWsRoutes = (io: Server) => {
  io.on('connection', (socket) => {
    // user connected
    socket.request.session.reload((err) => {
      if (err) {
        socket.send('Session invalid');
        socket.conn.close();
        return;
      }

      internalRegisterWsRoutes(socket);
    });
  });
};
