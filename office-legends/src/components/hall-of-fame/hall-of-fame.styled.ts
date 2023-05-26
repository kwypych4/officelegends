import { styled } from 'styled-components';
import { variables } from 'variables';

import hallOfFame from '../../assets/images/hall_of_fame.png';

export const Wrapper = styled.div`
  position: absolute;
  background-image: url(${hallOfFame});
  width: ${variables.HALL_OF_FAME_WIDTH}px;
  height: ${variables.HALL_OF_FAME_HEIGHT}px;
  left: ${variables.HALL_OF_FAME_LEFT_POS}px;
  top: 0;
`;
