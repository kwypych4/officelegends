import { NPCProps } from 'components/player/player.types';
import { handleChangePosition } from 'components/player/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGameStore } from 'store';
import { DirectionsType } from 'types';
import { variables } from 'variables';

import * as Styled from './npc.styled';

export const NPCPlayer = ({ gameServer, username, id, position }: NPCProps) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [playerPosition, setPlayerPosition] = useState<DirectionsType | null>(null);
  const { socket } = useGameStore();

  const npcMoveHandler = useCallback(
    (action: (DirectionsType | null)[]) => {
      setTimeout(() => setPlayerPosition(null), action.length * variables.INTERVAL_REFRESH);
      action.forEach((direction, index) => {
        setTimeout(() => {
          handleChangePosition({
            world: gameServer,
            direction,
            playerPosition,
            playerRef,
            setPlayerPosition,
            isOpenKeyActive: false,
            isControllablePlayer: false,
          });
        }, variables.INTERVAL_REFRESH * index + 1);
      });
    },
    [gameServer, playerPosition]
  );

  useEffect(() => {
    socket.on('move', ({ player, direction }) => {
      if (player === id) npcMoveHandler([direction]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, socket]);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.style.top = `${position.y}px`;
    playerRef.current.style.left = `${position.x}px`;
  }, [position]);
  return (
    <Styled.Player ref={playerRef} $direction={playerPosition} key={id}>
      <Styled.PlayerName>{username}</Styled.PlayerName>
    </Styled.Player>
  );
};
