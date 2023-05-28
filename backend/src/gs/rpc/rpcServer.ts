import { JSONRPCResponse, JSONRPCServer } from 'json-rpc-2.0';
import { Express, Response } from 'express';

const handleResponse = (res: Response, response: JSONRPCResponse) => {
  if (!response) {
    res.sendStatus(204);
    return;
  }

  res.json({ ...response });
};

const setupRpcServer = (app: Express, rpc: JSONRPCServer) => {
  app.post('/rpc', (req, res) => {
    const request = req.body;

    rpc.receive(request).then((response) => handleResponse(res, response));
  });
};

export { setupRpcServer };
