import { HallOfFame, Player, PlayRoom, Shop } from 'components';
import { useRef } from 'react';

import { GameWrapper } from './game.styled';

export const GamePage = () => {
  const playerRef = useRef<HTMLDivElement | null>(null);

  return (
    <GameWrapper>
      <Shop />
      <PlayRoom />
      <HallOfFame />
      <Player playerRef={playerRef} />
    </GameWrapper>
  );
};
