import * as Styled from './coin.styled';

type CoinProps = {
  position: {
    x: number;
    y: number;
  };
};

export const Coin = ({ position }: CoinProps) => {
  return <Styled.Wrapper $position={position} />;
};
