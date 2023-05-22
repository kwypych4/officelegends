import { LoggedLayout } from 'layouts/app/logged';
import { GamePage } from 'pages';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { appRoutes } from 'urls';

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LoggedLayout />}>
      <Route path={appRoutes.app.game} element={<GamePage />} />
    </Route>
  )
);
