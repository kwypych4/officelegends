import { styled } from 'styled-components';
import { variables } from 'variables';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: violet;
  width: ${variables.BOARD_WIDTH}px;
  height: ${variables.BOARD_HEIGHT}px;
`;
