import { HallOfFame, Player, PlayRoom, Shop } from 'components';
import { useGameStore, useUserStore } from 'store';

import { GameWrapper } from './playground.styled';

export const PlaygroundMap = () => {
  const { playersList } = useGameStore();
  const { id: playerId } = useUserStore();

  return (
    <GameWrapper>
      <Shop />
      <PlayRoom />
      <HallOfFame />
      {playerId && <Player gameServer={1} isControllable id={playerId} />}
      {playersList &&
        playersList
          .filter(({ id }) => id !== playerId)
          .map(({ id, username }) => (
            <Player gameServer={1} isControllable={false} key={id} id={id} username={username} />
          ))}
    </GameWrapper>
  );
};
