import * as Styled from 'components/player/player.styled';
import { handleChangePosition } from 'components/player/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DirectionsType } from 'types';
import { variables } from 'variables';

export const ControllablePlayer = () => {
  const intervalRef = useRef<Array<number>>([]);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [playerPosition, setPlayerPosition] = useState<DirectionsType | null>(null);

  const handleKeyDown = useCallback(
    (key: KeyboardEvent) => {
      switch (key.code) {
        case 'KeyS':
          handleChangePosition({ direction: 'bottom', playerPosition, playerRef, setPlayerPosition });
          break;
        case 'KeyW':
          handleChangePosition({ direction: 'top', playerPosition, playerRef, setPlayerPosition });
          break;
        case 'KeyA':
          handleChangePosition({ direction: 'left', playerPosition, playerRef, setPlayerPosition });
          break;
        case 'KeyD':
          handleChangePosition({ direction: 'right', playerPosition, playerRef, setPlayerPosition });
          break;
        default:
      }
    },
    [playerPosition]
  );

  const handleAddIntervals = useCallback(
    (key: KeyboardEvent) => {
      if (key.repeat) {
        return;
      }
      if (intervalRef.current.length > 0) {
        clearInterval(intervalRef.current[0]);

        intervalRef.current.slice(0, intervalRef.current.length - 1);
      }
      const intervalId = setInterval(() => handleKeyDown(key), variables.INTERVAL_REFRESH);

      intervalRef.current?.push(intervalId);
    },
    [handleKeyDown]
  );

  const handleRemoveIntervals = () => {
    setPlayerPosition(null);

    if (intervalRef.current.length > 0) {
      intervalRef.current
        .slice(0, intervalRef.current.length - 1)
        .map((slicedIntervals) => clearInterval(slicedIntervals));
    }
    intervalRef.current?.map((intervalNumber) => clearInterval(intervalNumber));

    intervalRef.current.splice(0, intervalRef.current.length);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleAddIntervals);
    window.addEventListener('keyup', handleRemoveIntervals);

    return () => {
      window.removeEventListener('keydown', handleAddIntervals);
      window.removeEventListener('keyup', handleRemoveIntervals);
    };
  }, [handleAddIntervals]);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.style.top = `${variables.PLAYER_INIT_Y}px`;
    playerRef.current.style.left = `${variables.PLAYER_INIT_X}px`;
  }, []);

  return (
    <Styled.Player ref={playerRef} $direction={playerPosition}>
      <Styled.PlayerName>Kamyl22</Styled.PlayerName>
    </Styled.Player>
  );
};
