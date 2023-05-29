import { styled } from 'styled-components';
import { variables } from 'variables';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: violet;
  width: ${variables.BOARD_WIDTH}px;
  height: ${variables.BOARD_HEIGHT}px;

  h2 {
    margin-top: -50px;
    margin-bottom: 50px;
  }
`;
