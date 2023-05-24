import { player } from '@prisma/client';
import { GameState } from './state/GameState';
import { ConnectedPlayer } from './state/ConnectedPlayer';

class Game {
  private name: string;

  private map: string;

  private state: GameState;

  constructor(name: string, map: string) {
    this.name = name;
    this.map = map;
    this.state = new GameState();
  }

  public onPlayerJoined = (player: player) => {
    this.state.players.push(new ConnectedPlayer(player));
  };

  public onPlayerLeft = (player: player) => {
    this.state.players.filter((p) => p.player.id !== player.id);
  };

  public onChatMessage = (message: string, sender: player) => {
    this.state.chat.push({
      first: message,
      second: sender,
    });
  };

  public getState = () => this.state; // TODO: return a copy of this.state

  public getChat = () =>
    this.state.chat.map((e) => ({
      message: e.first,
      sender: e.second.username,
    }));
  // TODO: add private method to notify clients of game state changes? or should the clients poll the server?
}

let runningGames: Game[] = [];

const startGame = (name: string, map: string) => runningGames.push(new Game(name, map));

const activeGames = (): Game[] => runningGames;

const finishGame = (id: number) => {
  runningGames = runningGames.filter((g, i) => i !== id);
};

export { startGame, activeGames, finishGame, Game };
