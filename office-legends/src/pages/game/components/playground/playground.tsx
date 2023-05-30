import { HallOfFame, Player, PlayRoom, Shop } from 'components';

import { response } from './playground.data';
import { GameWrapper } from './playground.styled';

export const PlaygroundMap = () => {
  return (
    <GameWrapper>
      <Shop />
      <PlayRoom />
      <HallOfFame />
      <Player gameServer={1} isControllable />
      {response.map(({ id, action, username }) => (
        <Player gameServer={1} isControllable={false} key={id} action={action} username={username} />
      ))}
    </GameWrapper>
  );
};
