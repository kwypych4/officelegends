import { api } from 'api';
import { Doors, Frames, Player } from 'components';
import { useCustomQuery } from 'hooks';
import { useGameStore, useUserStore } from 'store';

import * as Styled from './hall-of-fame.styled';

export const HallOfFameMap = () => {
  const { playersList } = useGameStore();
  const { id: playerId } = useUserStore();

  const fameListQuery = useCustomQuery('fameList', api.fame.getList);

  return (
    <Styled.Wrapper>
      <Doors />
      {fameListQuery.data && <Frames topPlayersList={fameListQuery.data} />}
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
