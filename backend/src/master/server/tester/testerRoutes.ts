import express, { Express } from 'express';

const registerTesterRoutes = (app: Express) => {
  app.use('/tester', express.static('src/master/server/tester/public'));
};

export { registerTesterRoutes };
