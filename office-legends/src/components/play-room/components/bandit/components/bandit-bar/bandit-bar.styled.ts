import { keyframes, styled } from 'styled-components';

import banditRoll from '../../../../../../assets/images/bandit/bandit_bar.png';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const BanditBarWrapper = styled.div`
  display: flex;
  width: 500px;
  width: 100%;
  background-color: red;
  justify-content: space-evenly;
  margin-bottom: 36px;
  margin-top: 12px;
  align-self: center;
  div {
    width: 100px;
    height: 100px;
    background-color: blue;
    background-image: url(${banditRoll});
  }
`;

type BanditBarType = { result: number; duration: number };

const rollAnimation = (result: number) => keyframes`

  0%{
    background-position: 0 0
  }
  10% {
    background-position: 0 -200px
  }
  20% {
    background-position: 0 0px
  }
  30% {
    background-position: 0 -200px
  }
  40% {
    background-position: 0 0px
  }
  50% {
    background-position: 0 -200px
  }
  60% {
    background-position: 0 0px
  }
  70% {
    background-position: 0 -200px
  }
  80% {
    background-position: 0 0px
  }

  100%{
    background-position: 0 -${result * 100}px
  }

`;

export const BanditBar = styled.div<BanditBarType>`
  width: 100px;
  height: 100px;
  background-color: blue;
  background-image: url(${banditRoll});
  animation: ${({ result }) => rollAnimation(result)} forwards;
  animation-duration: ${({ duration }) => `${duration}s`};
`;
