import { useUserStore } from 'store';

import hallOfFameImage from '../../../../assets/images/hall_of_fame_bg_min.png';
import playgroundImage from '../../../../assets/images/playground_bg.png';
import * as Styled from './game-choose.styled';

export const GameChoose = () => {
  const chooseHandler = (game: number) => {
    useUserStore.setState({ gameServer: game });
  };

  return (
    <Styled.Wrapper>
      <Styled.GamePicker background={playgroundImage} onClick={() => chooseHandler(1)}>
        <div>Playground</div>
      </Styled.GamePicker>
      <Styled.GamePicker background={hallOfFameImage} onClick={() => chooseHandler(2)}>
        <div>Hall of fame</div>
      </Styled.GamePicker>
    </Styled.Wrapper>
  );
};
