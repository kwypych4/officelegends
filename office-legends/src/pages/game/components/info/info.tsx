import { Slider } from 'antd';
import { useUserStore } from 'store';

import * as Styled from './info.styled';

export const Info = () => {
  const { money, exp } = useUserStore();

  const getLevel = () => Number(((exp || 0) / 1000).toString().split('.')[0]);

  const getSliderValue = () => {
    const currentLevel = getLevel();
    const value = (exp || 0) / 1000 - currentLevel;
    return Number((value * 1000).toFixed());
  };

  return (
    <Styled.Wrapper>
      <div>Money: {money || 0}$</div>
      <Styled.SliderWrapper>
        <span>EXP: {exp}</span>
        <Slider value={getSliderValue()} max={1000} handleStyle={{ display: 'none' }} />
      </Styled.SliderWrapper>

      <div>Level: {getLevel()}</div>
    </Styled.Wrapper>
  );
};
