import { HallOfFame, Player, PlayRoom, Shop } from 'components';

import { response } from './game.data';
import { GameWrapper } from './game.styled';

export const GamePage = () => {
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
