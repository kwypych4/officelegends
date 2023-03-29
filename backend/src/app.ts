import express from 'express';
import bodyParser from 'body-parser';
import { JSONRPCServer } from 'json-rpc-2.0';
import { registerRoutes } from './rpc/routes';
import { setupRpcServer } from './rpc/server';

const rpc = new JSONRPCServer();
const app = express();
const port = 3000;

app.use(bodyParser.json());
registerRoutes(rpc);
setupRpcServer(app, rpc);

app.get('/', (req, res) => {
  res.send('JSON-RPC server available at POST /rpc');
});

app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
