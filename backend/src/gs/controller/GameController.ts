import { ConnectedPlayer } from '../model/ConnectedPlayer';

class GameController {
  private connectedPlayers = Array<ConnectedPlayer>();

  joinPlayer(player: ConnectedPlayer) {
    if (this.findPlayer(player.id)) return;

    this.connectedPlayers.push(player);
  }

  removePlayer(playerId: number) {
    // TODO save player data

    this.connectedPlayers = this.connectedPlayers.filter((p) => p.id !== playerId);
  }

  private findPlayer(id: number) {
    return this.connectedPlayers.filter((p) => p.id === id)[0];
  }
}

const game = new GameController();

export { game };
