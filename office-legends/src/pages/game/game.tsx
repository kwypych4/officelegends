import { useUserStore } from 'store';

import { GameChoose, PlaygroundMap } from '.';
import { HallOfFameMap, Settings } from './components';
import { GameWrapper } from './game.styled';

export const GamePage = () => {
  const { gameServer } = useUserStore();

  const getGame = () => {
    if (gameServer === null || gameServer === undefined) return <GameChoose />;
    if (gameServer === 2) return <HallOfFameMap />;

    return <PlaygroundMap />;
  };

  return (
    <GameWrapper>
      {getGame()} <Settings />
    </GameWrapper>
  );
};
