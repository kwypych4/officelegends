import express from 'express';
import { JSONRPCServer } from 'json-rpc-2.0';
import session from 'express-session';
import registerRpcRoutes from './rpc/routes';
import setupRpcServer, { RpcServerParams } from './rpc/server';

const rpc = new JSONRPCServer<RpcServerParams>();
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
registerRpcRoutes(rpc);
setupRpcServer(app, rpc);

app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
