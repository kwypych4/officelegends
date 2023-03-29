import { Express } from 'express';
import { JSONRPCServer } from 'json-rpc-2.0';

export const setupRpcServer = (app: Express, rpc: JSONRPCServer) => {
  app.post('/rpc', (req, res) => {
    const request = req.body;

    rpc.receive(request).then((response) => {
      if (!response) {
        res.sendStatus(204);
        return;
      }

      res.json(response);
    });
  });
};
