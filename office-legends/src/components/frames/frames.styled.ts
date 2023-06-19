import { styled } from 'styled-components';
import { colors } from 'styles';
import { variables } from 'variables';

import frame from '../../assets/images/frame.png';

export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  gap: 56px;
  top: 110px;
  width: 100%;
  height: 225px;
  padding-left: 28px;
`;

export const FrameWrapper = styled.div`
  position: relative;

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.8);
  }
`;

export const Frame = styled.div`
  position: relative;
  width: ${variables.FRAME_WIDTH}px;
  height: ${variables.FRAME_HEIGHT}px;
  background-image: url(${frame});
  z-index: 0;
  overflow: hidden;
`;

export const FrameSignature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
  width: 100%;
  gap: 0;
  color: ${colors.white};
  background-color: ${colors.vividCerulean}7f;
  font-size: 12px;
  border-radius: 3px;

  p {
    margin: 0;
    padding: 0;
    word-break: break-word;
    width: ${variables.FRAME_WIDTH}px;
    text-align: center;
  }
`;
