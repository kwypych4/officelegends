import { useGameStore } from 'store';

import * as Styled from './doors.styled';

export const Doors = () => {
  const { isHallOfFameDoorOpen } = useGameStore();

  return <Styled.Wrapper $isOpen={isHallOfFameDoorOpen} />;
};
