import { Response } from 'express';

const sendResponse = (status: number, message: string, res: Response) => {
  res.status(status).json({
    message,
  });
};

const ok = (message: string, res: Response) => sendResponse(200, message, res);
const badRequest = (message: string, res: Response) => sendResponse(400, message, res);
const unauthorized = (message: string, res: Response) => sendResponse(401, message, res);
const forbidden = (message: string, res: Response) => sendResponse(403, message, res);
const serverError = (message: string, res: Response) => sendResponse(500, message, res);

export { ok, badRequest, unauthorized, forbidden, serverError };
