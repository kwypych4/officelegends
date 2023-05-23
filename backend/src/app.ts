import express from 'express';
import { JSONRPCServer } from 'json-rpc-2.0';
import session from 'express-session';
import registerRoutes from './rpc/routes';
import setupRpcServer from './rpc/server';
import { Game } from './game/Game';
import { login, register } from './auth/UserAuth';

const rpc = new JSONRPCServer<Game>();
const app = express();
const port = 3000;

app.use(
  session({
    secret: 'dadada',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
registerRoutes(rpc);
setupRpcServer(app, rpc);

app.get('/', (req, res) => {
  res.send('JSON-RPC server available at POST /rpc');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // get Player from db
  const player = await login(username, password);

  req.session.player = player; // TODO: Ogarnąć czemu TypeScript się czepia
  req.session.save((err) => {
    res.json({
      message: 'ok',
    });
  });
});

app.post('/register', (req, res) => {
  const { username, password, faceId } = req.body;

  const player = register(username, password, faceId);
});

app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
