import { JSONRPCServer } from 'json-rpc-2.0';
import { startGame, Game } from '../game/Game';

const registerRoutes = (server: JSONRPCServer<Game>) => {
  server.addMethod('join', ({ player }, game: Game) => {
    startGame();
    // const game = activeGames()[player.gameId];
    // game.onPlayerJoined(player);
    return player;
  });

  server.addMethod('leave', ({ player }) => {
    // game.onPlayerLeft(player);
  });

  server.addMethod('test', () => 'dupa');
  server.addMethod('chat', ({ text }) => text);

  // TODO: Implement actual methods
};

export default registerRoutes;
