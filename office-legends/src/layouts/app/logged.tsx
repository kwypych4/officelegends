import { ProtectedRoute } from 'components/protected-route';
import { Outlet } from 'react-router-dom';

import * as Styled from './logged.styled';

export const LoggedLayout = () => {
  return (
    <Styled.Wrapper>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </Styled.Wrapper>
  );
};
