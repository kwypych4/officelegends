import { api } from 'api';
import { useCustomQuery } from 'hooks';
import { Navigate } from 'react-router-dom';
import { useAuthStore, useUserStore } from 'store';
import { appRoutes } from 'urls';

export const ProtectedRoute = ({ children, isAuthLayout }: { children: JSX.Element; isAuthLayout?: boolean }) => {
  const isLogged = useAuthStore((state) => state.isLogged);

  const isLoggedQuery = useCustomQuery(['verify'], () => api.auth.verify(), {
    onSuccess: ({ avatar, exp, gameServer, id, money, skin, username }) => {
      useAuthStore.setState({ isLogged: true });
      useUserStore.setState({ avatar, exp, gameServer, id, money, skin, username });
    },
    onError: () => {
      useAuthStore.setState({ isLogged: false });
      useUserStore.setState({
        avatar: null,
        exp: null,
        gameServer: null,
        id: null,
        money: null,
        skin: null,
        username: null,
      });
    },
    staleTime: Infinity,
    retry: false,
    enabled: !isLogged,
  });

  if (isLoggedQuery.isLoading) return <div>loading</div>;

  if (isAuthLayout) return isLogged ? <Navigate to={appRoutes.app.game} /> : children;

  return isLogged ? children : <Navigate to={appRoutes.auth.login} />;
};
