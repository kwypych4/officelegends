import { ControllablePlayer, NPCPlayer } from './components';
import { NPCProps, PlayerProps } from './player.types';

export const Player = ({ isControllable, action, username, gameServer }: PlayerProps | NPCProps) => {
  return (
    <div>
      {isControllable ? (
        <ControllablePlayer world={gameServer} />
      ) : (
        <NPCPlayer world={gameServer} action={action} username={username} />
      )}
    </div>
  );
};
