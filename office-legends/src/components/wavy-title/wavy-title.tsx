import * as Styled from './wavy-title.styled';

export const WavyTitle = ({ children }: { children: string }) => {
  const letters = children.split('').map((letter, index) => ({
    id: index,
    letter,
  }));

  return (
    <Styled.Wrapper>
      {letters.map(({ id, letter }) => (
        <Styled.Letter key={id} index={id}>
          {letter}
        </Styled.Letter>
      ))}
    </Styled.Wrapper>
  );
};
