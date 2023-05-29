import { LoginForm } from './components';
import * as Styled from './login.styled';

export const LoginPage = () => {
  return (
    <Styled.Wrapper>
      <h2>Login to game</h2>
      <LoginForm />
    </Styled.Wrapper>
  );
};
