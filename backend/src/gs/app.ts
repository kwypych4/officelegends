import { JSONRPCServer } from 'json-rpc-2.0';
import express from 'express';
import * as crypto from 'crypto';
import { setupRpcServer } from './rpc/rpcServer';
import { registerRpcRoutes } from './rpc/rpcRoutes';

const port = Number(process.argv[2]);
const serverName = process.argv[3];
const uuid = crypto.randomUUID();

const app = express();
const rpcServer = new JSONRPCServer();

setupRpcServer(app, rpcServer);
registerRpcRoutes(rpcServer);

app.listen(port, () =>
  console.log(`Game server '${serverName}' with UUID ${uuid} listening at http://localhost:${port}`)
);
