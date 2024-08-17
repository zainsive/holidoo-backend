import { NextFunction, Response, Request } from "express";

export const handle = (func: (request: any, response: Response) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return func({ ...req.params, ...req.body, ...req.query }, res);
  };
};
