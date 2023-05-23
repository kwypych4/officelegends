import { ConnectedPlayer } from './ConnectedPlayer';
import { Pickup } from './Pickup';

export class GameState {
  public players: Array<ConnectedPlayer>;

  public pickups: Array<Pickup>;
}
