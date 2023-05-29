import { HallOfFame, Player, PlayRoom, Shop } from 'components';

import { response } from './playground.data';
import { GameWrapper } from './playground.styled';

export const PlaygroundMap = () => {
  return (
    <GameWrapper>
      <Shop />
      <PlayRoom />
      <HallOfFame />
      <Player isControllable />
      {response.map(({ id, action, username }) => (
        <Player isControllable={false} key={id} action={action} username={username} />
      ))}
    </GameWrapper>
  );
};
