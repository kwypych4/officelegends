import { useUserStore } from 'store';

import { GameChoose, PlaygroundMap } from '.';
import { HallOfFameMap } from './components/hall-of-fame';
import { GameWrapper } from './game.styled';

export const GamePage = () => {
  const { gameServer } = useUserStore();

  const getGame = () => {
    if (gameServer === null || gameServer === undefined) return <GameChoose />;
    if (gameServer === 2) return <HallOfFameMap />;

    return <PlaygroundMap />;
  };

  return <GameWrapper>{getGame()}</GameWrapper>;
};
