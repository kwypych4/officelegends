import { Express } from 'express';
import { login, logout, register } from './auth/AuthController';

export const registerApiRoutes = (app: Express) => {
  app.get('/', (req, res) => {
    res.send('Master is running');
  });

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    await login(username, password, req, res);
  });

  app.post('/register', async (req, res) => {
    const { username, password, avatarId } = req.body;

    await register(username, password, Number(avatarId), req, res);
  });

  app.post('/logout', async (req, res) => {
    await logout(req, res);
  });
};
