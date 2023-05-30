import { WavyTitle } from 'components';

import { RegisterForm } from './components';
import * as Styled from './register.styled';

export const RegisterPage = () => {
  return (
    <Styled.Wrapper>
      <div>
        <WavyTitle>Create new user</WavyTitle>
      </div>
      <RegisterForm />
    </Styled.Wrapper>
  );
};
