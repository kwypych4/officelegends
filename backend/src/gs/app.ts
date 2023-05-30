import { JSONRPCServer } from 'json-rpc-2.0';
import express, { json } from 'express';
import { setupRpcServer } from './rpc/rpcServer';
import { registerRpcRoutes } from './rpc/rpcRoutes';
import { argv } from './argv';

const { port, serverName, uuid } = argv;

const app = express();
const rpcServer = new JSONRPCServer();

app.use(json());

setupRpcServer(app, rpcServer);
registerRpcRoutes(rpcServer);

app.listen(port, () =>
  console.log(`Game server '${serverName}' with UUID ${uuid} listening at http://localhost:${port}`)
);
