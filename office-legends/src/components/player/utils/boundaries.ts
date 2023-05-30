import { message } from 'antd';
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
  isControllablePlayer,
}: {
  direction: DirectionsType | null;
  playerCurrentTopPosition: number;
  playerCurrentLeftPosition: number;
  pixelsToMove: number;
  isOpenKeyActive: boolean;
  isControllablePlayer: boolean;
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
    isControllablePlayer &&
    playerCurrentTopPosition <= variables.SHOP_HEIGHT + variables.INTERACTION_MARGIN &&
    playerCurrentLeftPosition <= variables.SHOP_WIDTH + variables.INTERACTION_MARGIN - variables.PLAYER_WIDTH
  ) {
    if (isOpenKeyActive && direction === null) useGameStore.setState({ isShopOpened: true });

    if (!isOpenKeyActive)
      return message.info({ content: 'Press "E" key to open the shop.', key: 'shop', duration: 1.5 });
  }
  return true;
};

export const checkPlayRoomBoundaries = ({
  direction,
  playerCurrentTopPosition,
  playerCurrentLeftPosition,
  pixelsToMove,
  isOpenKeyActive,
  isControllablePlayer,
}: {
  direction: DirectionsType | null;
  playerCurrentTopPosition: number;
  playerCurrentLeftPosition: number;
  pixelsToMove: number;
  isOpenKeyActive: boolean;
  isControllablePlayer: boolean;
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
    isControllablePlayer &&
    playerCurrentTopPosition <= variables.PLAYROOM_HEIGHT + variables.INTERACTION_MARGIN &&
    playerCurrentLeftPosition <=
      variables.PLAYROOM_LEFT_POS + variables.PLAYROOM_WIDTH + variables.INTERACTION_MARGIN - 10 &&
    playerCurrentLeftPosition >= variables.PLAYROOM_LEFT_POS + variables.INTERACTION_MARGIN + variables.PLAYER_WIDTH
  ) {
    if (isOpenKeyActive && direction === null) useGameStore.setState({ isPlayroomOpened: true });
    if (!isOpenKeyActive)
      return message.info({ content: 'Press "E" key to open the playroom.', key: 'playroom', duration: 1.5 });
  }

  return true;
};

export const checkHallOfFameBoundaries = ({
  direction,
  playerCurrentTopPosition,
  playerCurrentLeftPosition,
  pixelsToMove,
  isOpenKeyActive,
  isControllablePlayer,
}: {
  direction: DirectionsType | null;
  playerCurrentTopPosition: number;
  playerCurrentLeftPosition: number;
  pixelsToMove: number;
  isOpenKeyActive: boolean;
  isControllablePlayer: boolean;
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
    isControllablePlayer &&
    playerCurrentTopPosition <= variables.HALL_OF_FAME_HEIGHT + variables.INTERACTION_MARGIN &&
    playerCurrentLeftPosition <=
      variables.HALL_OF_FAME_LEFT_POS + variables.HALL_OF_FAME_WIDTH - variables.INTERACTION_MARGIN &&
    playerCurrentLeftPosition >= variables.HALL_OF_FAME_LEFT_POS + variables.INTERACTION_MARGIN
  ) {
    if (!isOpenKeyActive)
      return message.info({ content: 'Press "E" key to move to Hall of fame.', key: 'hallOfFame', duration: 1.5 });
    if (isOpenKeyActive && direction === null) useUserStore.setState({ gameServer: 2 });
  }

  return true;
};

export const checkDoorsBoundaries = ({
  playerCurrentTopPosition,
  playerCurrentLeftPosition,
  isOpenKeyActive,
  isControllablePlayer,
}: {
  playerCurrentTopPosition: number;
  playerCurrentLeftPosition: number;
  isOpenKeyActive: boolean;
  isControllablePlayer: boolean;
}) => {
  if (
    playerCurrentTopPosition <= variables.DOORS_TOP_POS + variables.PLAYER_HEIGHT &&
    playerCurrentTopPosition >= variables.DOORS_TOP_POS - variables.DOORS_HEIGHT &&
    playerCurrentLeftPosition <= 0 + variables.DOORS_WIDTH + variables.INTERACTION_MARGIN
  ) {
    useGameStore.setState({ isHallOfFameDoorOpen: true });
    if (!isOpenKeyActive)
      return message.info({ content: 'Press "E" key to move to Playground.', key: 'playground', duration: 1.5 });
    if (isControllablePlayer && isOpenKeyActive) useUserStore.setState({ gameServer: 1 });
  } else {
    useGameStore.setState({ isHallOfFameDoorOpen: false });
  }

  return true;
};
