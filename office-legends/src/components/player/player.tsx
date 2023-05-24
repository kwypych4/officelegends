import { useCallback, useEffect, useRef } from 'react';
import { variables } from 'variables';

import * as Styled from './player.styled';

type PlayerProps = {
  playerRef: React.MutableRefObject<HTMLDivElement | null>;
};
export const Player = ({ playerRef: playerRefProps }: PlayerProps) => {
  const intervalRef = useRef<Array<number>>([]);
  const playerRef = playerRefProps;

  const checkBoundaries = ({
    direction,
    playerCurrentPosition,
    pixelsToMove,
  }: {
    direction: 'top' | 'bottom' | 'left' | 'right';
    playerCurrentPosition: number;
    pixelsToMove: number;
  }) => {
    if (direction === 'right' && playerCurrentPosition + pixelsToMove >= variables.BOARD_WIDTH - variables.PLAYER_WIDTH)
      return false;

    if (direction === 'left' && playerCurrentPosition + pixelsToMove <= 0) return false;

    if (
      direction === 'bottom' &&
      playerCurrentPosition + pixelsToMove >= variables.BOARD_HEIGHT - variables.PLAYER_HEIGHT
    )
      return false;

    if (direction === 'top' && playerCurrentPosition + pixelsToMove <= 0) return false;

    return true;
  };

  const checkShopBoundaries = ({
    direction,
    playerCurrentTopPosition,
    playerCurrentLeftPosition,
    pixelsToMove,
  }: {
    direction: 'top' | 'bottom' | 'left' | 'right';
    playerCurrentTopPosition: number;
    playerCurrentLeftPosition: number;
    pixelsToMove: number;
  }) => {
    if (
      direction === 'left' &&
      playerCurrentLeftPosition + pixelsToMove <= variables.SHOP_WIDTH &&
      playerCurrentTopPosition <= variables.SHOP_HEIGHT
    ) {
      return false;
    }

    if (
      direction === 'top' &&
      playerCurrentTopPosition + pixelsToMove <= variables.SHOP_HEIGHT &&
      playerCurrentLeftPosition <= variables.SHOP_WIDTH
    ) {
      return false;
    }

    if (
      playerCurrentTopPosition <= variables.SHOP_HEIGHT + variables.INTERACTION_MARGIN &&
      playerCurrentLeftPosition <= variables.SHOP_WIDTH + variables.INTERACTION_MARGIN
    ) {
      console.log('shop margin');
    }

    return true;
  };

  const getPlayerCurrentPosition = useCallback(
    (styleDirection: 'top' | 'left') => {
      if (!playerRef.current) return 0;
      return Number(playerRef.current.style[styleDirection].toString().slice(0, -2));
    },
    [playerRef]
  );

  const handleChangePosition = useCallback(
    (direction: 'top' | 'bottom' | 'left' | 'right') => {
      if (!playerRef.current) return;

      const styleDirection = direction === 'bottom' || direction === 'top' ? 'top' : 'left';
      const pixelsToMove =
        direction === 'bottom' || direction === 'right'
          ? variables.PLAYER_MOVE_PIXELS
          : variables.PLAYER_MOVE_PIXELS * -1;

      if (
        !checkBoundaries({
          direction,
          pixelsToMove,
          playerCurrentPosition: getPlayerCurrentPosition(styleDirection),
        }) ||
        !checkShopBoundaries({
          direction,
          pixelsToMove,
          playerCurrentLeftPosition: getPlayerCurrentPosition('left'),
          playerCurrentTopPosition: getPlayerCurrentPosition('top'),
        })
      )
        return;
      playerRef.current.style[styleDirection] = `${getPlayerCurrentPosition(styleDirection) + pixelsToMove}px`;
    },
    [playerRef, getPlayerCurrentPosition]
  );

  const handleKeyDown = useCallback(
    (key: KeyboardEvent) => {
      switch (key.code) {
        case 'KeyS':
          handleChangePosition('bottom');
          break;
        case 'KeyW':
          handleChangePosition('top');
          break;
        case 'KeyA':
          handleChangePosition('left');
          break;
        case 'KeyD':
          handleChangePosition('right');
          break;
        default:
      }
    },
    [handleChangePosition]
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

  return (
    <Styled.Player ref={playerRef}>
      <Styled.PlayerName>Kamyl</Styled.PlayerName>
    </Styled.Player>
  );
};
