import { Player } from '../model/Player';

export class ConnectedPlayer {
  public readonly player: Player;

  public x: number;

  public y: number;

  constructor(player: Player) {
    this.player = player;
  }
}
