import { styled } from 'styled-components';
import { variables } from 'variables';

export const AvatarWrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 18px;
  button {
    position: absolute;
    background-color: transparent !important;
    border: none;
    font-size: 18px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 !important;
    padding: 0 !important;
    z-index: 1;
    cursor: pointer;

    &:nth-of-type(2) {
      right: 0;
    }
  }
  .ant-carousel {
    width: ${variables.FORM_WIDTH}px !important;
  }
`;
