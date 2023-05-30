import { Dropdown as AntDropdown } from 'antd';
import { styled } from 'styled-components';
import { colors } from 'styles';

export const Dropdown = styled(AntDropdown)`
  position: absolute;
  bottom: 36px;
  left: 36px;
  svg {
    font-size: 40px;
    color: ${colors.black}a0;
  }
`;
