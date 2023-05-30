import { ConnectedPlayer } from '../model/ConnectedPlayer';
import { Position } from '../model/Position';
import { JoinPlayerData, JoinResponse, LeaveResponse, MoveResponse } from '../../common/RpcProtocol';

// May be used for collision detection
const PLAYER_WIDTH = 44;
const PLAYER_HEIGHT = 60;

class GameController {
  private connectedPlayers = Array<ConnectedPlayer>();

  joinPlayer(player: JoinPlayerData): JoinResponse {
    if (this.findPlayer(player.id))
      return {
        success: false,
      };

    this.connectedPlayers.push({
      id: player.id,
      nickname: player.nickname,
      avatar: player.avatar,
      money: player.money,
      exp: player.exp,
      skin: player.skin,
      position: { x: 0, y: 0 },
    });

    return {
      success: true,
      response: this.connectedPlayers,
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
      response: this.connectedPlayers,
      removedPlayer: player,
    };
  }

  private findPlayer(id: number): ConnectedPlayer {
    return this.connectedPlayers.filter((p) => p.id === id)[0];
  }
}

const gameController = new GameController();

export { gameController };
