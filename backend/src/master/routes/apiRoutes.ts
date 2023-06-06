import { Express } from 'express';
import { apiController } from '../controller/ApiController';

export const registerApiRoutes = (app: Express) => {
  app.get('/', (req, res) => {
    res.send('Master is running');
  });

  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    await apiController.login(username, password, req, res);
  });

  app.post('/api/register', async (req, res) => {
    const { username, password, avatarId } = req.body;

    await apiController.register(username, password, Number(avatarId), req, res);
  });

  app.post('/api/logout', async (req, res) => {
    await apiController.logout(req, res);
  });

  app.get('/api/verify', async (req, res) => {
    await apiController.verifySession(req, res);
  });

  app.get('/api/inventory', async (req, res) => {
    await apiController.getInventory(req, res);
  });

  app.get('/api/shop', async (req, res) => {
    await apiController.getShopItems(req, res);
  });

  app.patch('/api/player', async (req, res) => {
    await apiController.updatePlayer(req, res);
  })
};
