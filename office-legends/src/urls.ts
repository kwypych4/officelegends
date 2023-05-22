export const appUrls = {
  app: {
    base: '',
    pages: {
      game: '',
    },
  },
  auth: {
    base: '',
    pages: {
      login: 'login',
    },
  },
  error: {
    base: '',
    pages: {
      notFound: 'not-found',
      forbidden: 'forbidden',
    },
  },
};

export const appRoutes = {
  app: {
    game: `${appUrls.app.base}/${appUrls.app.pages.game}`,
  },
  auth: {
    login: `${appUrls.auth.base}/${appUrls.auth.pages.login}`,
  },
  error: {
    notFound: `${appUrls.error.base}/${appUrls.error.pages.notFound}`,
    forbidden: `${appUrls.error.base}/${appUrls.error.pages.forbidden}`,
  },
};
