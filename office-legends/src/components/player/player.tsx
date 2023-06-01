import { ControllablePlayer, NPCPlayer } from './components';
import { NPCProps, PlayerProps } from './player.types';

export const Player = ({ isControllable, username, gameServer, id, position }: PlayerProps | NPCProps) => {
  return (
    <div>
      {isControllable ? (
        <ControllablePlayer world={gameServer} position={position} key={id} id={id} />
      ) : (
        <NPCPlayer
          position={position}
          isControllable={false}
          gameServer={gameServer}
          username={username}
          id={id}
          key={id}
        />
      )}
    </div>
  );
};
