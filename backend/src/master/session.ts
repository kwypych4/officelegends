import connectPgSimple from 'connect-pg-simple';
import session, { SessionOptions } from 'express-session';
import { Express } from 'express';
import { BaseServer } from 'engine.io/build/server';

export const installSession = (app: Express, engine: BaseServer) => {
  const PgSession = connectPgSimple(session);

  const sessionConfig: SessionOptions = {
    store: new PgSession({
      tableName: 'session',
      createTableIfMissing: true,
    }),
    secret: 'dadada',
    resave: false,
    saveUninitialized: false,
  };

  const sessionMiddleware = session(sessionConfig);

  app.use(sessionMiddleware);
  engine.use(sessionMiddleware);
};
