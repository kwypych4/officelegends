import { Player, Shop } from 'components';
import { useRef } from 'react';

import { GameWrapper } from './game.styled';

export const GamePage = () => {
  const playerRef = useRef<HTMLDivElement | null>(null);

  return (
    <GameWrapper>
      <Shop />
      <Player playerRef={playerRef} />
    </GameWrapper>
  );
};
