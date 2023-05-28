import { Outlet } from 'react-router-dom';

import * as Styled from './not-logged.styled';

export const NotLoggedLayout = () => {
  return (
    <Styled.Wrapper>
      <Outlet />
    </Styled.Wrapper>
  );
};
