import avatar1 from '../../assets/images/avatar_1.png';
import avatar2 from '../../assets/images/avatar_2.png';
import avatar3 from '../../assets/images/avatar_3.png';
import avatar4 from '../../assets/images/avatar_4.png';
import * as Styled from './frame.styled';

export const Frame = () => {
  return (
    <Styled.Wrapper>
      <Styled.FrameWrapper>
        <img src={avatar1} alt='avatar' />
        <Styled.Frame />
        <Styled.FrameSignature>
          <p>Kamyl</p>
          <p>1250 EXP</p>
        </Styled.FrameSignature>
      </Styled.FrameWrapper>
      <Styled.FrameWrapper>
        <img src={avatar2} alt='avatar' />
        <Styled.Frame />
        <Styled.FrameSignature>
          <p>Krzychu</p>
          <p>1050 EXP</p>
        </Styled.FrameSignature>
      </Styled.FrameWrapper>
      <Styled.FrameWrapper>
        <img src={avatar3} alt='avatar' />
        <Styled.Frame />
        <Styled.FrameSignature>
          <p>Marcin</p>
          <p>821 EXP</p>
        </Styled.FrameSignature>
      </Styled.FrameWrapper>
      <Styled.FrameWrapper>
        <img src={avatar4} alt='avatar' />
        <Styled.Frame />
        <Styled.FrameSignature>
          <p>WrrumKubica</p>
          <p>123 EXP</p>
        </Styled.FrameSignature>
      </Styled.FrameWrapper>
    </Styled.Wrapper>
  );
};
