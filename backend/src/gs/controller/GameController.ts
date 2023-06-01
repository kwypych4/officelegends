import {
  ConnectedPlayer,
  Position,
  JoinPlayerData,
  JoinResponse,
  LeaveResponse,
  MoveResponse,
} from '../../common/RpcProtocol';
import { argv } from '../argv';

// May be used for collision detection
const PLAYER_WIDTH = 44;
const PLAYER_HEIGHT = 60;

const randomX = () => Math.floor(Math.random() * (600 - 470) + 470);
const randomY = () => Math.floor(Math.random() * (400 - 300) + 300);

class GameController {
  private connectedPlayers = Array<ConnectedPlayer>();

  joinPlayer(player: JoinPlayerData): JoinResponse {
    if (this.findPlayer(player.id))
      return {
        success: false,
      };

    this.connectedPlayers.push({
      id: player.id,
      username: player.username,
      avatar: player.avatar,
      money: player.money,
      exp: player.exp,
      skin: player.skin,
      position: { x: randomX(), y: randomY() },
    });

    return {
      success: true,
      response: {
        playersList: this.connectedPlayers,
        gameServer: argv.serverId,
      },
    };
  }

  movePlayer(playerId: number, position: Position, direction: string): MoveResponse {
    const player = this.findPlayer(playerId);
    if (!player) {
      return {
        success: false,
      };
    }

    player.position = position;
    return {
      success: true,
      position,
      direction,
    };
  }

  removePlayer(playerId: number): LeaveResponse {
    const player = this.findPlayer(playerId);
    if (!player) {
      return {
        success: false,
      };
    }

    this.connectedPlayers = this.connectedPlayers.filter((p) => p.id !== playerId);

    return {
      success: true,
      response: {
        playersList: this.connectedPlayers,
        gameServer: argv.serverId,
      },
      removedPlayer: player,
    };
  }

  private findPlayer(id: number): ConnectedPlayer {
    return this.connectedPlayers.filter((p) => p.id === id)[0];
  }
}

const gameController = new GameController();

export { gameController };
