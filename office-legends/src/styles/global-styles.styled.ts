import { createGlobalStyle } from 'styled-components';

import { button, form } from './components';

export const GlobalStyles = createGlobalStyle`

  *{
    font-family: 'Press Start 2P' !important;
  }

  body{
    margin: 0;
    padding: 0;
   
    & > * {
      margin: 0;
      padding: 0;
    }
  }

  ${button}
  ${form}

`;
