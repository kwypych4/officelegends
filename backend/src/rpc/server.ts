import { Express, Response } from 'express';
import { JSONRPCResponse, JSONRPCServer } from 'json-rpc-2.0';
import { player } from '@prisma/client';
import { activeGames, Game } from '../game/Game';
import { findPlayerById } from '../master/utils/DbUtils';

export type RpcServerParams = {
  game: Game;
  player: player;
};

const handleResponse = (res: Response, response: JSONRPCResponse) => {
  if (!response) {
    res.sendStatus(204);
    return;
  }

  res.json({ ...response });
};

const setupRpcServer = (app: Express, rpc: JSONRPCServer<RpcServerParams>) => {
  app.post('/rpc/manage', async (req, res) => {
    const request = req.body;
    const player = await findPlayerById(req.session.playerId);

    // TODO: Add some authorization?
    if (!player) {
      res.status(403).json({
        message: 'Unauthorized',
      });
      return;
    }

    const serverParams = {
      player,
      game: undefined,
    };

    rpc.receive(request, serverParams).then((response: JSONRPCResponse) => {
      handleResponse(res, response);
    });
  });

  app.post(`/rpc/:gameId`, async (req, res) => {
    const request = req.body;
    const gameId = Number(req.params.gameId);
    const games = activeGames();

    if (gameId >= games.length) {
      res.status(400).json({
        message: 'Invalid game id',
      });
      return;
    }

    const game = games[gameId];
    const player = await findPlayerById(req.session.playerId);

    if (!player) {
      res.status(403).json({
        message: 'Player not found',
      });
    }

    const serverParams: RpcServerParams = { game, player };
    rpc.receive(request, serverParams).then((response: JSONRPCResponse) => handleResponse(res, response));
  });
};

export default setupRpcServer;
