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
app.use(
  express.urlencoded({
    extended: true,
  })
);
registerRoutes(rpc);
setupRpcServer(app, rpc);

app.get('/', (req, res) => {
  res.send('JSON-RPC server available at POST /rpc');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });

  // get Player from db
  const player = await login(username, password);
  if (!player) {
    res.status(401).json({
      message: 'Login failed',
    });
    return;
  }

  req.session.playerId = player.id;
  req.session.save((err) => {
    if (err) {
      res.status(500).json({
        message: 'Failed to save session data',
      });
    } else {
      res.json({
        message: 'Login successful',
      });
    }
  });
});

app.post('/register', async (req, res) => {
  const { username, password, faceId } = req.body;
  console.log(req.body);

  const player = await register(username, password, faceId);
  if (!player) {
    res.status(400).json({
      message: 'Failed to register new account',
    });
    return;
  }

  const loggedInPlayer = await login(username, password);
  if (!loggedInPlayer) {
    res.status(500).json({
      message: 'Registered but failed to login',
    });
    return;
  }

  req.session.playerId = loggedInPlayer.id;
  req.session.save((err) => {
    if (err) {
      res.status(500).json({
        message: 'Registered but failed to save session data',
      });
    } else {
      res.json({
        message: 'Registration successful',
      });
    }
  });
});

app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
