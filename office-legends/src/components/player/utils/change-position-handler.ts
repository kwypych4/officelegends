import { useGameStore } from 'store';
import { DirectionsType } from 'types';
import { variables } from 'variables';

import {
  checkBoundaries,
  checkDoorsBoundaries,
  checkHallOfFameBoundaries,
  checkPlayRoomBoundaries,
  checkShopBoundaries,
} from '.';

const { socket } = useGameStore.getState();

const getPlayerCurrentPosition = (
  styleDirection: 'top' | 'left',
  playerRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  if (!playerRef.current) return 0;
  return Number(playerRef.current.style[styleDirection].toString().slice(0, -2));
};

const getBoundaries = ({
  world,
  direction,
  pixelsToMove,
  styleDirection,
  playerRef,
  isOpenKeyActive,
  isControllablePlayer,
}: {
  world: number;
  direction: DirectionsType | null;
  pixelsToMove: number;
  styleDirection: 'top' | 'left';
  playerRef: React.MutableRefObject<HTMLDivElement | null>;
  isOpenKeyActive: boolean;
  isControllablePlayer: boolean;
}) => {
  if (world === 2)
    return (
      !checkBoundaries({
        direction,
        pixelsToMove,
        playerCurrentPosition: getPlayerCurrentPosition(styleDirection, playerRef),
        topBoundaryPixels: variables.HALL_OF_FAME_WORLD_TOP,
      }) ||
      !checkDoorsBoundaries({
        playerCurrentLeftPosition: getPlayerCurrentPosition('left', playerRef),
        playerCurrentTopPosition: getPlayerCurrentPosition('top', playerRef),
        isOpenKeyActive,
        isControllablePlayer,
      })
    );

  return (
    !checkBoundaries({
      direction,
      pixelsToMove,
      playerCurrentPosition: getPlayerCurrentPosition(styleDirection, playerRef),
    }) ||
    !checkShopBoundaries({
      direction,
      pixelsToMove,
      playerCurrentLeftPosition: getPlayerCurrentPosition('left', playerRef),
      playerCurrentTopPosition: getPlayerCurrentPosition('top', playerRef),
      isOpenKeyActive,
      isControllablePlayer,
    }) ||
    !checkPlayRoomBoundaries({
      direction,
      pixelsToMove,
      playerCurrentLeftPosition: getPlayerCurrentPosition('left', playerRef),
      playerCurrentTopPosition: getPlayerCurrentPosition('top', playerRef),
      isOpenKeyActive,
      isControllablePlayer,
    }) ||
    !checkHallOfFameBoundaries({
      direction,
      pixelsToMove,
      playerCurrentLeftPosition: getPlayerCurrentPosition('left', playerRef),
      playerCurrentTopPosition: getPlayerCurrentPosition('top', playerRef),
      isOpenKeyActive,
      isControllablePlayer,
    })
  );
};

export const handleChangePosition = ({
  direction,
  playerRef,
  playerPosition,
  world,
  setPlayerPosition,
  isOpenKeyActive,
  isControllablePlayer,
}: {
  direction: DirectionsType | null;
  playerRef: React.MutableRefObject<HTMLDivElement | null>;
  playerPosition: DirectionsType | null;
  world: number;
  setPlayerPosition: React.Dispatch<React.SetStateAction<DirectionsType | null>>;
  isOpenKeyActive: boolean;
  isControllablePlayer: boolean;
}) => {
  if (!playerRef.current) return;
  const playerReference = playerRef.current;
  const styleDirection = direction === 'bottom' || direction === 'top' ? 'top' : 'left';
  const pixelsToMove =
    direction === 'bottom' || direction === 'right' ? variables.PLAYER_MOVE_PIXELS : variables.PLAYER_MOVE_PIXELS * -1;

  if (direction !== playerPosition) setPlayerPosition(direction);

  if (
    getBoundaries({ world, direction, pixelsToMove, playerRef, styleDirection, isOpenKeyActive, isControllablePlayer })
  )
    return;
  if (direction === null) return;
  playerReference.style[styleDirection] = `${getPlayerCurrentPosition(styleDirection, playerRef) + pixelsToMove}px`;

  if (isControllablePlayer)
    socket.emit('move', {
      direction,
      position: {
        x: getPlayerCurrentPosition('left', playerRef),
        y: getPlayerCurrentPosition('top', playerRef),
      },
    });
};
