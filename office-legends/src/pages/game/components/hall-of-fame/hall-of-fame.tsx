import { Doors, Player } from 'components';
import { useGameStore, useUserStore } from 'store';

import * as Styled from './hall-of-fame.styled';

export const HallOfFameMap = () => {
  const { playersList } = useGameStore();
  const { id: playerId } = useUserStore();

  return (
    <Styled.Wrapper>
      <Doors />
      {playersList &&
        playersList.map(({ id, username, position }) => {
          if (id !== playerId)
            return (
              <Player position={position} gameServer={2} isControllable={false} key={id} id={id} username={username} />
            );
          return <Player gameServer={2} isControllable id={playerId} position={position} key={id} />;
        })}
    </Styled.Wrapper>
  );
};
