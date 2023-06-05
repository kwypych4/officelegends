import { styled } from 'styled-components';
import { colors } from 'styles';

const WRAPPER_WIDTH = 350;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${colors.white}4f;
  height: 110px;
  width: ${WRAPPER_WIDTH}px;
  padding: 12px;
  user-select: none;
`;

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 11px;
    align-self: center;
    margin: 0;
    padding-bottom: 6px;
    inline-size: ${WRAPPER_WIDTH}px;
    overflow-wrap: break-word;
  }

  .ant-slider {
    margin: 0;
    padding: 0;
    cursor: default;
    .ant-slider-track {
      background-color: ${colors.blue};
    }
    .ant-slider-rail {
      background-color: ${colors.gray};
    }

    &:hover {
      .ant-slider-track {
        background-color: ${colors.vividCerulean};
      }
      .ant-slider-rail {
        background-color: ${colors.silver};
      }
    }
  }
`;
