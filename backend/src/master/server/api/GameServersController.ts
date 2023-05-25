import { Response } from 'express';
import { gameServersManager } from '../../state/GameServersManager';
import { badRequest, ok } from '../../utils/ResponseUtils';

const registerGameServer = (name: string, guid: string, res: Response) => {
  if (!name) return badRequest('Server name must be specified', res);

  gameServersManager.registerServer(name, guid);

  return ok('Server registered', res);
};

const unregisterGameServer = (guid: string, res: Response) => {
  gameServersManager.unregisterServer(guid);

  return ok('Server unregistered', res);
};

const listRunningServers = (res: Response) => ok(gameServersManager.getRegisteredServers(), res);

export { registerGameServer, unregisterGameServer, listRunningServers };
