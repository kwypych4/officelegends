import { Express, Request } from 'express';
import { JSONRPCResponse, JSONRPCServer } from 'json-rpc-2.0';
import { activeGames, Game } from '../game/Game';

// const authorize = (request: Request): Player => request.session.player;

const setupRpcServer = (app: Express, rpc: JSONRPCServer<Game>) => {
  app.post(`/rpc/:gameId`, (req, res) => {
    const request = req.body;
    const gameId = Number(req.params.gameId);
    const game = activeGames()[gameId];
    // const auth = authorize(req);

    rpc.receive(request, game).then((response: JSONRPCResponse) => {
      if (!response) {
        res.sendStatus(204);
        return;
      }

      res.json({ ...response });
    });
  });
};

export default setupRpcServer;
