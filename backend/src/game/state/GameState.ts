import { player } from '@prisma/client';
import { ConnectedPlayer } from './ConnectedPlayer';
import { Pickup } from './Pickup';
import Pair from '../../util/Pair';

export class GameState {
  public players: Array<ConnectedPlayer>;

  public pickups: Array<Pickup>;

  public chat: Array<Pair<string, player>>;

  constructor() {
    this.players = new Array<ConnectedPlayer>();
    this.pickups = new Array<Pickup>();
    this.chat = new Array<Pair<string, player>>();
  }
}
