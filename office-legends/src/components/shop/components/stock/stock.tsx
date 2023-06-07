import { useGameStore } from 'store';

import * as Styled from './stock.styled';

export const Stock = () => {
  const { isShopOpened } = useGameStore();

  const handleStockClose = () => {
    useGameStore.setState({ isShopOpened: false });
  };

  return isShopOpened ? (
    <Styled.Wrapper
      title='Shop'
      open={isShopOpened}
      onOk={handleStockClose}
      onCancel={handleStockClose}
      width={700}
      closeIcon='X'
    >
      <h3>Out of stock! Come back later</h3>
    </Styled.Wrapper>
  ) : null;
};
