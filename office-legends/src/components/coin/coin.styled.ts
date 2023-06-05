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
    margin-top: 60px;
    width: 30px;
    opacity: 0.2;
  }

  50% {
    margin-top: 50px;
    width: 50px;
    opacity: 0.4;
  }

  100%{
    margin-top: 60px;
    width: 30px;
    opacity: 0.2;
  }

`;

export const Wrapper = styled.div`
  position: absolute;

  top: 500px;
  left: 450px;
  width: ${variables.COIN_WIDTH}px;
  height: ${variables.COIN_HEIGHT}px;

  background-image: url(${coinImage});
  box-shadow: 0px 100px 24px -47px rgba(66, 68, 90, 1);
  animation: ${coinAnimation} 1.3s infinite forwards;
  &::after {
    display: block;
    position: absolute;
    content: '';
    top: 0;
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
