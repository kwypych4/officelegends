import { useGameStore, useUserStore } from 'store';
import { DirectionsType } from 'types';
import { variables } from 'variables';

export const checkBoundaries = ({
  direction,
  playerCurrentPosition,
  pixelsToMove,
  topBoundaryPixels,
}: {
  direction: DirectionsType | null;
  playerCurrentPosition: number;
  pixelsToMove: number;
  topBoundaryPixels?: number;
}) => {
  if (direction === 'right' && playerCurrentPosition + pixelsToMove >= variables.BOARD_WIDTH - variables.PLAYER_WIDTH)
    return false;

  if (direction === 'left' && playerCurrentPosition + pixelsToMove <= 0) return false;

  if (
    direction === 'bottom' &&
    playerCurrentPosition + pixelsToMove >= variables.BOARD_HEIGHT - variables.PLAYER_HEIGHT
  )
    return false;

  if (direction === 'top' && playerCurrentPosition + pixelsToMove <= (topBoundaryPixels || 0)) return false;

  return true;
};

export const checkShopBoundaries = ({
  direction,
  playerCurrentTopPosition,
  playerCurrentLeftPosition,
  pixelsToMove,
  isOpenKeyActive,
}: {
  direction: DirectionsType | null;
  playerCurrentTopPosition: number;
  playerCurrentLeftPosition: number;
  pixelsToMove: number;
  isOpenKeyActive: boolean;
}) => {
  if (
    direction === 'left' &&
    playerCurrentLeftPosition + pixelsToMove <= variables.SHOP_LEFT_POS + variables.SHOP_WIDTH &&
    playerCurrentTopPosition + 40 <= variables.SHOP_HEIGHT
  )
    return false;

  if (
    direction === 'right' &&
    playerCurrentLeftPosition + pixelsToMove >= variables.SHOP_LEFT_POS - variables.PLAYER_WIDTH &&
    playerCurrentTopPosition + 40 <= variables.SHOP_HEIGHT
  )
    return false;

  if (
    direction === 'top' &&
    playerCurrentTopPosition + pixelsToMove <= variables.SHOP_HEIGHT - variables.PLAYER_HEIGHT / 2 &&
    playerCurrentLeftPosition <= variables.SHOP_LEFT_POS + variables.SHOP_WIDTH &&
    playerCurrentLeftPosition >= variables.SHOP_LEFT_POS - variables.PLAYER_WIDTH
  ) {
    return false;
  }

  if (
    isOpenKeyActive &&
    direction === null &&
    playerCurrentTopPosition <= variables.SHOP_HEIGHT + variables.INTERACTION_MARGIN &&
    playerCurrentLeftPosition <= variables.SHOP_WIDTH + variables.INTERACTION_MARGIN - variables.PLAYER_WIDTH
  ) {
    console.log('shop open');
  }

  return true;
};

export const checkPlayRoomBoundaries = ({
  direction,
  playerCurrentTopPosition,
  playerCurrentLeftPosition,
  pixelsToMove,
  isOpenKeyActive,
}: {
  direction: DirectionsType | null;
  playerCurrentTopPosition: number;
  playerCurrentLeftPosition: number;
  pixelsToMove: number;
  isOpenKeyActive: boolean;
}) => {
  if (
    direction === 'left' &&
    playerCurrentLeftPosition + pixelsToMove <= variables.PLAYROOM_LEFT_POS + variables.PLAYROOM_WIDTH &&
    playerCurrentTopPosition < variables.PLAYROOM_HEIGHT - variables.PLAYER_HEIGHT
  )
    return false;

  if (
    direction === 'right' &&
    playerCurrentLeftPosition + pixelsToMove >= variables.PLAYROOM_LEFT_POS - variables.PLAYER_WIDTH &&
    playerCurrentTopPosition + 40 <= variables.PLAYROOM_HEIGHT
  )
    return false;

  if (
    direction === 'top' &&
    playerCurrentTopPosition + pixelsToMove <= variables.PLAYROOM_HEIGHT - variables.PLAYER_HEIGHT / 2 &&
    playerCurrentLeftPosition >= variables.PLAYROOM_LEFT_POS - variables.PLAYER_WIDTH &&
    playerCurrentLeftPosition <= variables.PLAYROOM_LEFT_POS + variables.PLAYROOM_WIDTH
  )
    return false;

  if (
    isOpenKeyActive &&
    direction === null &&
    playerCurrentTopPosition <= variables.PLAYROOM_HEIGHT + variables.INTERACTION_MARGIN &&
    playerCurrentLeftPosition <=
      variables.PLAYROOM_LEFT_POS + variables.PLAYROOM_WIDTH + variables.INTERACTION_MARGIN - 10 &&
    playerCurrentLeftPosition >= variables.PLAYROOM_LEFT_POS + variables.INTERACTION_MARGIN + variables.PLAYER_WIDTH
  ) {
    console.log('playroom margin');
  }

  return true;
};

export const checkHallOfFameBoundaries = ({
  direction,
  playerCurrentTopPosition,
  playerCurrentLeftPosition,
  pixelsToMove,
  isOpenKeyActive,
}: {
  direction: DirectionsType | null;
  playerCurrentTopPosition: number;
  playerCurrentLeftPosition: number;
  pixelsToMove: number;
  isOpenKeyActive: boolean;
}) => {
  if (
    direction === 'left' &&
    playerCurrentLeftPosition + pixelsToMove <= variables.HALL_OF_FAME_LEFT_POS + variables.HALL_OF_FAME_WIDTH &&
    playerCurrentTopPosition < variables.PLAYROOM_HEIGHT - variables.PLAYER_HEIGHT
  ) {
    return false;
  }

  if (
    direction === 'right' &&
    playerCurrentLeftPosition + pixelsToMove >= variables.HALL_OF_FAME_LEFT_POS - variables.PLAYER_WIDTH &&
    playerCurrentTopPosition + 40 <= variables.HALL_OF_FAME_HEIGHT
  )
    return false;

  if (
    direction === 'top' &&
    playerCurrentTopPosition + pixelsToMove <= variables.HALL_OF_FAME_HEIGHT - variables.PLAYER_HEIGHT / 2 &&
    playerCurrentLeftPosition >= variables.HALL_OF_FAME_LEFT_POS - variables.PLAYER_WIDTH &&
    playerCurrentLeftPosition <= variables.HALL_OF_FAME_LEFT_POS + variables.HALL_OF_FAME_WIDTH
  ) {
    return false;
  }

  if (
    isOpenKeyActive &&
    direction === null &&
    playerCurrentTopPosition <= variables.HALL_OF_FAME_HEIGHT + variables.INTERACTION_MARGIN &&
    playerCurrentLeftPosition <=
      variables.HALL_OF_FAME_LEFT_POS + variables.HALL_OF_FAME_WIDTH - variables.INTERACTION_MARGIN &&
    playerCurrentLeftPosition >= variables.HALL_OF_FAME_LEFT_POS + variables.INTERACTION_MARGIN
  ) {
    useUserStore.setState({ gameServer: 2 });
  }

  return true;
};

export const checkDoorsBoundaries = ({
  playerCurrentTopPosition,
  playerCurrentLeftPosition,
  isOpenKeyActive,
}: {
  playerCurrentTopPosition: number;
  playerCurrentLeftPosition: number;
  isOpenKeyActive: boolean;
}) => {
  if (
    playerCurrentTopPosition <= variables.DOORS_TOP_POS + variables.PLAYER_HEIGHT &&
    playerCurrentTopPosition >= variables.DOORS_TOP_POS - variables.DOORS_HEIGHT &&
    playerCurrentLeftPosition <= 0 + variables.DOORS_WIDTH + variables.INTERACTION_MARGIN
  ) {
    if (isOpenKeyActive) useUserStore.setState({ gameServer: 1 });
    useGameStore.setState({ isHallOfFameDoorOpen: true });
  } else {
    useGameStore.setState({ isHallOfFameDoorOpen: false });
  }

  return true;
};
