import { ProtectedRoute } from 'components/protected-route';
import { Outlet } from 'react-router-dom';

import * as Styled from './not-logged.styled';

export const NotLoggedLayout = () => {
  return (
    <Styled.Wrapper>
      <ProtectedRoute isAuthLayout>
        <Outlet />
      </ProtectedRoute>
    </Styled.Wrapper>
  );
};
