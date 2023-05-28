import { timestamp } from '../util/DateUtils';

type RegisteredServer = {
  name: string;
  guid: string;
  lastHeartbeat: number;
};

let registeredServers = Array<RegisteredServer>();

const gameServerManager = {
  unregisterServer: (guid: string) => {
    registeredServers = registeredServers.filter((s) => s.guid !== guid);
  },
  registerServer: (name: string, guid: string) => {
    registeredServers = registeredServers.filter((s) => s.guid !== guid);

    registeredServers.push({
      name,
      guid,
      lastHeartbeat: timestamp(),
    });
  },
  getRegisteredServers: () => [...registeredServers],
};

export { RegisteredServer, gameServerManager };
