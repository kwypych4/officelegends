import express from 'express';
import session from 'express-session';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { registerApiRoutes } from './server/api/apiRoutes';

const port = Number(process.argv[2]);
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: 'dadada',
    resave: false,
    saveUninitialized: false,
  })
);

registerApiRoutes(app);

app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
