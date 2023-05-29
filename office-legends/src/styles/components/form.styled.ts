import { css } from 'styled-components';

export const form = css`
  .ant-form {
    display: flex;
    flex-direction: column;
    button {
      margin-left: auto;
    }
    .ant-form-item {
      .ant-row {
        display: block;
        .ant-col {
          font-size: 8px;
          .ant-form-item-control-input {
            .ant-form-item-control-input-content {
              input {
                border-radius: 0;
              }
            }
          }

          div {
            .ant-form-item-explain {
              font-size: 8px;
              .ant-form-item-explain-error {
                max-width: 310px;
              }
            }
          }
        }
      }
    }
    div:has(button) {
      display: flex;
      justify-content: space-between;
      width: 100%;

      button {
        margin: unset;
      }
    }
  }
`;
