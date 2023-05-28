import { Response } from 'express';
import { gameServerManager } from '../GameServerManager';
import { badRequest, ok } from '../../util/JsonResponses';

const registerGameServer = (name: string, guid: string, res: Response) => {
  if (!name) return badRequest('Server name must be specified', res);

  gameServerManager.registerServer(name, guid);

  return ok('Server registered', res);
};

const unregisterGameServer = (guid: string, res: Response) => {
  gameServerManager.unregisterServer(guid);

  return ok('Server unregistered', res);
};

const listRunningServers = (res: Response) => ok(gameServerManager.getRegisteredServers(), res);

export { registerGameServer, unregisterGameServer, listRunningServers };
