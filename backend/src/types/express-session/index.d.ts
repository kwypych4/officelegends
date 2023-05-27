import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    playerId: number;
    gameId: number;
  }
}

declare module 'http' {
  interface IncomingMessage {
    cookieHolder?: string;
    session: Session & {
      count: number;
    } & SessionData;
  }
}
