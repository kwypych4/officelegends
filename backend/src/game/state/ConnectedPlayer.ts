import { player } from '@prisma/client';

export class ConnectedPlayer {
  public readonly player: player;

  public x: number;

  public y: number;

  constructor(player: player) {
    this.player = player;
  }
}
