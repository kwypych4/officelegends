import { keyframes, styled } from 'styled-components';
import { colors } from 'styles';
import { variables } from 'variables';

import coinImage from '../../assets/images/coin.png';

const coinAnimation = keyframes`

  0% {
    top: 500px
  }

  50% {
    top: 510px;
  }

  100%{
    top: 500px;
  }

`;

const shadowAnimation = keyframes`

  0% {
    top: 10px;
    width: 30px;
    opacity: 0.2;
  }

  50% {
    top: 0px;
    width: 50px;
    opacity: 0.4;
  }

  100%{
    top: 10px;
    width: 30px;
    opacity: 0.2;
  }

`;

type WrapperProps = {
  $position: {
    x: number;
    y: number;
  };
};

export const Wrapper = styled.div<WrapperProps>`
  position: absolute;

  top: ${({ $position }) => $position.y}px;
  left: ${({ $position }) => $position.x}px;
  width: ${variables.COIN_WIDTH}px;
  height: ${variables.COIN_HEIGHT}px;

  background-image: url(${coinImage});
  box-shadow: 0px 100px 24px -47px rgba(66, 68, 90, 1);
  animation: ${coinAnimation} 1.3s infinite forwards;

  &::after {
    display: block;
    position: absolute;
    content: '';
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 10px;
    margin-top: 55px;
    border-radius: 40%;
    background-color: ${colors.black};
    opacity: 0.2;
    animation: ${shadowAnimation} 1.3s infinite forwards;
  }
`;
