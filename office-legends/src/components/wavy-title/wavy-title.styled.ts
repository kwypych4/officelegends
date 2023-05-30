import { keyframes, styled } from 'styled-components';

const animation = keyframes`
  0% {
    transform: translateY(0px);
  }
  5% {
    transform: translateY(-20px);
  }
  10%,
  25% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0px);
  }
 
`;

export const Wrapper = styled.h2`
  position: relative;
  display: inline-block;
`;

type LetterProps = { index: number };

export const Letter = styled.span<LetterProps>`
  position: relative;
  display: inline-block;
  width: 21px;
  animation: ${animation} 10s ease-in-out infinite;
  animation-delay: ${({ index }) => `calc(.1s*${index})`};
`;
