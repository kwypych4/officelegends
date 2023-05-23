import { GameState } from './state/GameState';
import { Player } from './model/Player';
import { ConnectedPlayer } from './state/ConnectedPlayer';

class Game {
  private state: GameState;

  public newGame = () => {
    this.state = new GameState();
  };

  public onPlayerJoined = (player: Player) => {
    this.state.players.push(new ConnectedPlayer(player));
  };

  public onPlayerLeft = (player: Player) => {
    this.state.players.filter((p) => p.player !== player);
  };
}

let runningGames: Game[] = [];

const startGame = () => runningGames.push(new Game());

const activeGames = (): Game[] => runningGames;

const finishGame = (id: number) => {
  runningGames = runningGames.filter((g, i) => i !== id);
};

export { startGame, activeGames, finishGame, Game };
