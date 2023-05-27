import { ControllablePlayer, NPCPlayer } from './components';
import { NPCProps, PlayerProps } from './player.types';

export const Player = ({ isControllable, action, username }: PlayerProps | NPCProps) => {
  return <div>{isControllable ? <ControllablePlayer /> : <NPCPlayer action={action} username={username} />}</div>;
};
