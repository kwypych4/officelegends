import { styled } from 'styled-components';
import { variables } from 'variables';

import img from '../../assets/images/grass.png';

export const GameWrapper = styled.div`
  display: flex;

  width: ${variables.BOARD_WIDTH}px;
  min-width: ${variables.BOARD_WIDTH}px;
  height: ${variables.BOARD_HEIGHT}px;
  min-height: ${variables.BOARD_HEIGHT}px;
  background-image: url(${img});
  background-size: 51.3px;
  position: relative;
`;
