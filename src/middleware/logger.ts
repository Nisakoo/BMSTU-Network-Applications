import type { NextFunction, Request, RequestHandler, Response } from "express";

const loggerMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

export default loggerMiddleware;
