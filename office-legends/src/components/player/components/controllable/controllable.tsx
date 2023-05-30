import * as Styled from 'components/player/player.styled';
import { handleChangePosition } from 'components/player/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DirectionsType } from 'types';
import { variables } from 'variables';

export const ControllablePlayer = ({ world }: { world: number }) => {
  const intervalRef = useRef<Array<NodeJS.Timer>>([]);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [playerPosition, setPlayerPosition] = useState<DirectionsType | null>(null);

  const handleKeyDown = useCallback(
    (key: KeyboardEvent) => {
      switch (key.code) {
        case 'KeyS':
          handleChangePosition({
            world,
            direction: 'bottom',
            playerPosition,
            playerRef,
            setPlayerPosition,
            isOpenKeyActive: false,
            isControllablePlayer: true,
          });
          break;
        case 'KeyW':
          handleChangePosition({
            world,
            direction: 'top',
            playerPosition,
            playerRef,
            setPlayerPosition,
            isOpenKeyActive: false,
            isControllablePlayer: true,
          });
          break;
        case 'KeyA':
          handleChangePosition({
            world,
            direction: 'left',
            playerPosition,
            playerRef,
            setPlayerPosition,
            isOpenKeyActive: false,
            isControllablePlayer: true,
          });
          break;
        case 'KeyD':
          handleChangePosition({
            world,
            direction: 'right',
            playerPosition,
            playerRef,
            setPlayerPosition,
            isOpenKeyActive: false,
            isControllablePlayer: true,
          });
          break;
        case 'KeyE':
          handleChangePosition({
            world,
            direction: null,
            playerPosition,
            playerRef,
            setPlayerPosition,
            isOpenKeyActive: true,
            isControllablePlayer: true,
          });
          break;
        default:
      }
    },
    [playerPosition, world]
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
      <Styled.PlayerName>
        <div>Kamyl22</div>
      </Styled.PlayerName>
    </Styled.Player>
  );
};
