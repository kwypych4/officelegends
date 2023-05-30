import { styled } from 'styled-components';
import { variables } from 'variables';

export const GameWrapper = styled.div`
  display: flex;
  position: relative;
  width: ${variables.BOARD_WIDTH}px;
  min-width: ${variables.BOARD_WIDTH}px;
  height: ${variables.BOARD_HEIGHT}px;
  min-height: ${variables.BOARD_HEIGHT}px;
  overflow: hidden;
`;
