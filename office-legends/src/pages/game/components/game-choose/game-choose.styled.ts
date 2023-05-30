import { styled } from 'styled-components';
import { colors } from 'styles';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  background-color: red;
`;

type GamePickerProps = { background?: string };

export const GamePicker = styled.div<GamePickerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: blue;
  background-image: url(${({ background }) => background});
  width: 30%;
  height: 90%;
  cursor: pointer;
  user-select: none;
  transition: 0.15s linear;

  &:hover {
    transform: scale(1.05);
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.black}a1;

    width: 100%;
    height: 70px;
    color: ${colors.white};
  }
`;
