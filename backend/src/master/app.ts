import express from 'express';
import session from 'express-session';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { registerApiRoutes } from './server/api/apiRoutes';
import { registerWsRoutes } from './server/ws/wsRoutes';

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

app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

registerApiRoutes(app);
registerWsRoutes(io);

app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
