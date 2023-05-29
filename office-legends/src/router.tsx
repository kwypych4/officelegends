import { LoggedLayout, NotLoggedLayout } from 'layouts';
import { GamePage, LoginPage, RegisterPage } from 'pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { appRoutes } from 'urls';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<LoggedLayout />}>
        <Route path={appRoutes.app.game} element={<GamePage />} />
      </Route>
      <Route element={<NotLoggedLayout />}>
        <Route path={appRoutes.auth.login} element={<LoginPage />} />
        <Route path={appRoutes.auth.register} element={<RegisterPage />} />
      </Route>
    </>
  )
);
