import { Doors, Player } from 'components';

import * as Styled from './hall-of-fame.styled';

export const HallOfFameMap = () => {
  return (
    <Styled.Wrapper>
      <Doors />
      <Player gameServer={2} isControllable />
    </Styled.Wrapper>
  );
};
