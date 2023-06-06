import {
  ConnectedPlayer,
  Position,
  JoinPlayerData,
  JoinResponse,
  LeaveResponse,
  MoveResponse,
  Coin,
  AddCoinResponse,
  UpdatePlayerRequest,
  UpdatePlayerResponse,
  GameStatus,
} from '../../common/RpcProtocol';
import { argv } from '../argv';

// May be used for collision detection
const PLAYER_WIDTH = 44;
const PLAYER_HEIGHT = 60;
const COIN_SIZE = 50; // coin size is 50x50

export const randomX = () => Math.floor(Math.random() * (600 - 470) + 470);
export const randomY = () => Math.floor(Math.random() * (400 - 300) + 300);

const testIntersect = (a1: number, a2: number, b1: number, b2: number) =>
  (a1 >= b1 && a1 <= b2) || (a2 >= b1 && a2 <= b2);

class GameController {
  private connectedPlayers = Array<ConnectedPlayer>();

  private coins = Array<Coin>();

  joinPlayer(player: JoinPlayerData): JoinResponse {
    if (this.findPlayer(player.id))
      return {
        success: false,
      };

    this.connectedPlayers.push({
      id: Number(player.id),
      username: String(player.username),
      avatar: Number(player.avatar),
      money: Number(player.money),
      exp: Number(player.exp),
      credits: Number(player.credits),
      skin: String(player.skin),
      position: { x: randomX(), y: randomY() },
    });

    return {
      success: true,
      response: {
        playersList: this.connectedPlayers,
        coinList: this.coins,
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

    const pickedCoin = this.getCoinToPickUp(position);
    if (pickedCoin) {
      player.money += pickedCoin.amount;
      player.exp += 50;
      this.removeCoin(pickedCoin);
    }

    return {
      success: true,
      position,
      direction,
      money: player.money,
      exp: player.exp,
      coins: this.coins,
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
        coinList: this.coins,
        gameServer: argv.serverId,
      },
      removedPlayer: player,
    };
  }

  updatePlayer({ playerId, money, exp, credits }: UpdatePlayerRequest): UpdatePlayerResponse {
    const player = this.findPlayer(playerId);
    if (!player) {
      return {
        success: false,
      };
    }

    if (typeof money !== 'undefined') player.money = Number(money);
    if (typeof exp !== 'undefined') player.exp = Number(exp);
    if (typeof credits !== 'undefined') player.credits = Number(credits);

    return {
      success: true,
      response: {
        player,
      },
    };
  }

  addCoin(coin: Coin): AddCoinResponse {
    this.coins.push(coin);

    return {
      success: true,
      response: this.coins,
    };
  }

  getStatus(): GameStatus {
    return {
      playersList: this.connectedPlayers,
      coinList: this.coins,
      gameServer: argv.serverId,
    };
  }

  private removeCoin(coin: Coin) {
    this.coins = this.coins.filter((c) => JSON.stringify(c) !== JSON.stringify(coin));
  }

  private getCoinToPickUp(playerPosition: Position): Coin {
    const p1: Position = {
      x: playerPosition.x - PLAYER_WIDTH,
      y: playerPosition.y - PLAYER_HEIGHT,
    };

    const p2: Position = {
      x: playerPosition.x + PLAYER_WIDTH,
      y: playerPosition.y + PLAYER_HEIGHT,
    };

    return this.coins.find((c) => {
      const pos = c.position;

      const c1: Position = {
        x: pos.x - COIN_SIZE,
        y: pos.y - COIN_SIZE,
      };

      const c2: Position = {
        x: pos.x + COIN_SIZE,
        y: pos.y + COIN_SIZE,
      };

      return testIntersect(p1.x, p2.x, c1.x, c2.x) && testIntersect(p1.y, p2.y, c1.y, c2.y);
    });
  }

  private findPlayer(id: number): ConnectedPlayer {
    return this.connectedPlayers.filter((p) => p.id === id)[0];
  }
}

const gameController = new GameController();

export { gameController };
