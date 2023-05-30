import { keyframes, styled } from 'styled-components';
import { variables } from 'variables';

import doorsImage from '../../assets/images/doors.png';

const doorsOpenAnimation = keyframes`
  0%{
    transform: rotate(0deg);
    transform-origin: 50% 0%;
  }
  100%{
    transform: rotate(-45deg);
    transform-origin: 50% 0%;
  }
`;
const doorsCloseAnimation = keyframes`
  0%{
    transform: rotate(-45deg);
    transform-origin: 50% 0%;
  }
  100%{
    transform: rotate(0deg);
    transform-origin: 50% 0%;
  }
`;

type DoorsProps = { $isOpen: boolean };

export const Wrapper = styled.div<DoorsProps>`
  position: absolute;
  width: ${variables.DOORS_WIDTH}px;
  height: ${variables.DOORS_HEIGHT}px;
  top: ${variables.DOORS_TOP_POS}px;
  left: 0;
  background-image: url(${doorsImage});
  animation: ${({ $isOpen }) => ($isOpen ? doorsOpenAnimation : doorsCloseAnimation)};
  animation-duration: 2s;
  animation-fill-mode: forwards;
`;
