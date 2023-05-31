import fs from 'fs';

type GameServer = {
  name: string;
  uuid: string;
  address: string;
};

class GameServerManager {
  knownServers: GameServer[] = JSON.parse(fs.readFileSync('src/master/knownServers.json', 'utf-8'));

  getServer(id: number): GameServer {
    return this.knownServers[id - 1];
  }
}

const gameServerManager = new GameServerManager();

export { GameServer, gameServerManager };
