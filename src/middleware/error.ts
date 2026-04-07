import type { NextFunction, Request, Response } from "express";
import type { ErrorRespond } from "../common/response.js";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  res
    .status(500)
    .json({ error: "internal server error", code: 500 } satisfies ErrorRespond);
};

export default errorMiddleware;
