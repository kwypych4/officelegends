import { styled } from 'styled-components';
import { variables } from 'variables';

import shop from '../../assets/images/shop.png';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: ${variables.SHOP_LEFT_POS}px;
  background-image: url(${shop});
  width: ${variables.SHOP_WIDTH}px;
  height: ${variables.SHOP_HEIGHT}px;
`;
