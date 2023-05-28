import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { registerApiRoutes } from './api/apiRoutes';
import { registerWsRoutes } from './ws/wsRoutes';
import { registerTesterRoutes } from './tester/testerRoutes';
import { installSession } from './session';

const port = Number(process.argv[2]);
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: 'http://localhost:5173/',
    credentials: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(json());

installSession(app, io.engine);
registerApiRoutes(app);
registerWsRoutes(io);
registerTesterRoutes(app);

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Master is listening at http://localhost:${port}`));
