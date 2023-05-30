import * as Styled from 'components/player/player.styled';
import { handleChangePosition } from 'components/player/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DirectionsType } from 'types';
import { variables } from 'variables';

import { NPCPlayerProps } from './npc.types';

export const NPCPlayer = ({ world, action, username }: NPCPlayerProps) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [playerPosition, setPlayerPosition] = useState<DirectionsType | null>(null);

  const test2 = useCallback(() => {
    setTimeout(() => setPlayerPosition(null), action.length * variables.INTERVAL_REFRESH);
    action.forEach((direction, index) => {
      setTimeout(() => {
        handleChangePosition({
          world,
          direction: direction as any,
          playerPosition,
          playerRef,
          setPlayerPosition,
          isOpenKeyActive: false,
        });
      }, variables.INTERVAL_REFRESH * index + 1);
    });
  }, [action, playerPosition, world]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => test2(), []);
  useEffect(() => console.log('render'));
  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.style.top = `${variables.PLAYER_INIT_Y}px`;
    playerRef.current.style.left = `${variables.PLAYER_INIT_X}px`;
  }, []);
  return (
    <Styled.Player ref={playerRef} $direction={playerPosition}>
      <Styled.PlayerName>{username}</Styled.PlayerName>
    </Styled.Player>
  );
};
