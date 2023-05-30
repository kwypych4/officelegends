import { WavyTitle } from 'components';

import { LoginForm } from './components';
import * as Styled from './login.styled';

export const LoginPage = () => {
  return (
    <Styled.Wrapper>
      <WavyTitle>Login to game</WavyTitle>
      <LoginForm />
    </Styled.Wrapper>
  );
};
