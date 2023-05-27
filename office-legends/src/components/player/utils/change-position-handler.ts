import { DirectionsType } from 'types';
import { variables } from 'variables';

import { checkBoundaries, checkHallOfFameBoundaries, checkPlayRoomBoundaries, checkShopBoundaries } from '.';

const getPlayerCurrentPosition = (
  styleDirection: 'top' | 'left',
  playerRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  if (!playerRef.current) return 0;
  return Number(playerRef.current.style[styleDirection].toString().slice(0, -2));
};

export const handleChangePosition = ({
  direction,
  playerRef,
  playerPosition,
  setPlayerPosition,
}: {
  direction: DirectionsType | null;
  playerRef: React.MutableRefObject<HTMLDivElement | null>;
  playerPosition: DirectionsType | null;
  setPlayerPosition: React.Dispatch<React.SetStateAction<DirectionsType | null>>;
}) => {
  if (!playerRef.current) return;
  const playerReference = playerRef.current;
  const styleDirection = direction === 'bottom' || direction === 'top' ? 'top' : 'left';
  const pixelsToMove =
    direction === 'bottom' || direction === 'right' ? variables.PLAYER_MOVE_PIXELS : variables.PLAYER_MOVE_PIXELS * -1;

  if (direction !== playerPosition) setPlayerPosition(direction);

  if (direction === null) return;
  if (
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
    }) ||
    !checkPlayRoomBoundaries({
      direction,
      pixelsToMove,
      playerCurrentLeftPosition: getPlayerCurrentPosition('left', playerRef),
      playerCurrentTopPosition: getPlayerCurrentPosition('top', playerRef),
    }) ||
    !checkHallOfFameBoundaries({
      direction,
      pixelsToMove,
      playerCurrentLeftPosition: getPlayerCurrentPosition('left', playerRef),
      playerCurrentTopPosition: getPlayerCurrentPosition('top', playerRef),
    })
  )
    return;
  playerReference.style[styleDirection] = `${getPlayerCurrentPosition(styleDirection, playerRef) + pixelsToMove}px`;

  // const request: WebsocketRequestType = {
  //   direction,
  //   position: {
  //     x: getPlayerCurrentPosition('left', playerRef),
  //     y: getPlayerCurrentPosition('top', playerRef),
  //   },
  // };
};
