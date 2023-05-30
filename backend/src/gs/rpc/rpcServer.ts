import { JSONRPCResponse, JSONRPCServer } from 'json-rpc-2.0';
import { Express, Response } from 'express';
import { verifyUuidMiddleware } from './middleware';

const handleResponse = (res: Response, result: JSONRPCResponse) => {
  if (!result) {
    res.sendStatus(204);
    return;
  }

  res.json({ ...result });
};

const setupRpcServer = (app: Express, rpc: JSONRPCServer) => {
  rpc.applyMiddleware(verifyUuidMiddleware);

  app.post('/rpc', (req, res) => {
    const request = req.body;

    rpc.receive(request).then((result) => handleResponse(res, result));
  });
};

export { setupRpcServer };
