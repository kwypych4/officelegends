import { Server } from 'socket.io';

export const registerWsRoutes = (io: Server) => {
  io.on('connection', (socket) => {
    // user connected

    socket.on('join', (gameId: number) => {
      // user wants to join a game
    });

    socket.on('move', (x: number, y: number) => {
      // move the player
    });

    socket.on('leave', () => {
      // remove player from the game
    });

    socket.on('disconnect', () => {
      // user disconnected
    });
  });
};
