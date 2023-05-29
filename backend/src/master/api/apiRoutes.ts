import { Express } from 'express';
import { login, logout, register, verifySession } from './AuthController';
import { listRunningServers, registerGameServer, unregisterGameServer } from './GameServersController';

export const registerApiRoutes = (app: Express) => {
  app.get('/', (req, res) => {
    res.send('Master is running');
  });

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    await login(username, password, req, res);
  });

  app.post('/api/register', async (req, res) => {
    const { username, password, avatarId } = req.body;

    await register(username, password, Number(avatarId), req, res);
  });

  app.post('/api/logout', async (req, res) => {
    await logout(req, res);
  });

  app.get('/api/verify', async (req, res) => {
    await verifySession(req, res);
  });

  app.post('/api/server/register', (req, res) => {
    const { name, guid } = req.body;

    registerGameServer(name, guid, res);
  });

  app.post('/api/server/unregister', (req, res) => {
    const { guid } = req.body;

    unregisterGameServer(guid, res);
  });

  app.get('/api/server', (req, res) => {
    listRunningServers(res);
  });
};
