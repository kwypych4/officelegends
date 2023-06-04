import * as Styled from './bandit-bar.styled';

type BanditBarProps = {
  duration: number;
  banditResult: number[];
  credits: number;
};

export const BanditBar = ({ duration, banditResult, credits }: BanditBarProps) => {
  return (
    <Styled.Wrapper>
      <Styled.BanditBarWrapper>
        <Styled.BanditBar duration={duration} result={banditResult[0]}>
          {banditResult[0]}
        </Styled.BanditBar>
        <Styled.BanditBar duration={duration} result={banditResult[1]}>
          {banditResult[1]}
        </Styled.BanditBar>
        <Styled.BanditBar duration={duration} result={banditResult[2]}>
          {banditResult[2]}
        </Styled.BanditBar>
      </Styled.BanditBarWrapper>

      <h3>Credits left: {credits}</h3>
    </Styled.Wrapper>
  );
};
