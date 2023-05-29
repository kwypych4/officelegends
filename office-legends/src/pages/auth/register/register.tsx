import { RegisterForm } from './components';
import * as Styled from './register.styled';

export const RegisterPage = () => {
  return (
    <Styled.Wrapper>
      <div>
        <h2>Create new user</h2>
      </div>
      <RegisterForm />
    </Styled.Wrapper>
  );
};
