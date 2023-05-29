import { api } from 'api';
import { useCustomQuery } from 'hooks';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from 'store';
import { appRoutes } from 'urls';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLogged = useAuthStore((state) => state.isLogged);

  const isLoggedQuery = useCustomQuery(['verify'], () => api.auth.verify(), {
    onSuccess: () => {
      useAuthStore.setState({ isLogged: true });
    },
    onError: () => {
      useAuthStore.setState({ isLogged: false });
    },
    staleTime: Infinity,
    retry: false,
    enabled: !isLogged,
  });

  if (isLoggedQuery.isLoading) return <div>loading</div>;

  return isLogged ? children : <Navigate to={appRoutes.auth.login} />;
};
