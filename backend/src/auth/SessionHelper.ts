import { Request } from 'express';

const hasSession = (req: Request) => !!req.session;
