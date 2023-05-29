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
      register: 'register',
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
    register: `${appUrls.auth.base}/${appUrls.auth.pages.register}`,
  },
  error: {
    notFound: `${appUrls.error.base}/${appUrls.error.pages.notFound}`,
    forbidden: `${appUrls.error.base}/${appUrls.error.pages.forbidden}`,
  },
};

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const url = (url: string) => (options?: { [key: string]: string | number | Array<string | number> }) =>
  `${BASE_URL}/${url}${options ? `/${options}` : ''}`;

export const apiUrls = {
  login: url('login'),
  register: url('register'),
  verify: url('verify'),
};
