import { styled } from 'styled-components';
import { variables } from 'variables';

import play from '../../assets/images/play.png';

export const Wrapper = styled.div`
  position: absolute;
  background-image: url(${play});
  width: ${variables.PLAYROOM_WIDTH}px;
  height: ${variables.PLAYROOM_HEIGHT}px;
  left: ${variables.PLAYROOM_LEFT_POS}px;
  top: 0;
`;
