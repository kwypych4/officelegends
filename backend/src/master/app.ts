import express, { json } from 'express';
import session from 'express-session';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { registerApiRoutes } from './server/api/apiRoutes';
import { registerWsRoutes } from './server/ws/wsRoutes';
import { registerTesterRoutes } from './server/tester/testerRoutes';

const port = Number(process.argv[2]);
const app = express();
const server = createServer(app);
const io = new Server(server);

const sessionMiddleware = session({
  secret: 'dadada',
  resave: false,
  saveUninitialized: false,
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(json());
app.use(sessionMiddleware);
registerApiRoutes(app);

io.engine.use(sessionMiddleware);
registerWsRoutes(io);

registerTesterRoutes(app);

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
