import { ControllablePlayer, NPCPlayer } from './components';
import { NPCProps, PlayerProps } from './player.types';

export const Player = ({ isControllable, username, gameServer, id }: PlayerProps | NPCProps) => {
  return (
    <div>
      {isControllable ? (
        <ControllablePlayer world={gameServer} />
      ) : (
        <NPCPlayer isControllable={false} gameServer={gameServer} username={username} id={id} />
      )}
    </div>
  );
};
