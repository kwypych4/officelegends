import { styled } from 'styled-components';
import { variables } from 'variables';

export const Player = styled.div`
  width: ${variables.PLAYER_WIDTH}px;
  height: ${variables.PLAYER_HEIGHT}px;
  background-color: blue;
  position: absolute;
`;

export const PlayerName = styled.span`
  position: absolute;
  top: -20px;
  display: block;
  width: 100%;
  text-align: center;
  background-color: transparent;
  padding: 0;
  margin: 0;
`;
