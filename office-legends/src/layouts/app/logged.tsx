import { Outlet } from 'react-router-dom';

import * as Styled from './logged.styled';

export const LoggedLayout = () => {
  return (
    <Styled.Wrapper>
      <Outlet />
    </Styled.Wrapper>
  );
};
