import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { registerApiRoutes } from './server/api/apiRoutes';
import { registerWsRoutes } from './server/ws/wsRoutes';
import { registerTesterRoutes } from './server/tester/testerRoutes';
import { installSession } from './session';

const port = Number(process.argv[2]);
const app = express();
const server = createServer(app);
const io = new Server(server);

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
