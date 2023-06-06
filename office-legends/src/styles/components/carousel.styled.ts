import { css } from 'styled-components';
import { colors } from 'styles';

export const carousel = css`
  .ant-carousel {
    .slick-slider {
      .slick-arrow {
        font-size: 15px;
        color: ${colors.black};
        background-color: transparent !important;
        &::before {
          display: none;
        }
      }
      .slick-list {
        .slick-track {
          .slick-slide {
            div {
              display: flex;
              position: relative;
              justify-content: center;
              align-items: center;
              height: 200px;
              img {
                width: 40% !important;
              }
            }
          }
        }
      }
    }
  }
`;
