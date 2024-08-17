import { NextFunction, Response, Request, Router } from "express";
import { modules } from "./modules";

import { validationType } from "./types/validations";
import { AppError } from "./config/app-error";
import { HttpMethods } from "./constants";

const router = Router();

const validate =
  (validations: validationType[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validations.forEach((validation) => {
        validation.schema.parse(req[validation.source]);
      });

      next();
    } catch (error) {
      res.status(400).json({ status: 400, message: "Valiation failed." });
    }
  };

const moduleRoutes = modules.map((modl) => {
  switch (modl.method) {
    case HttpMethods.POST:
      return router.post(modl.route, validate(modl.validate), modl.handler);
    case HttpMethods.PATCH:
      return router.patch(modl.route, validate(modl.validate), modl.handler);
    case HttpMethods.DELETE:
      return router.delete(modl.route, validate(modl.validate), modl.handler);
    case HttpMethods.PUT:
      return router.put(modl.route, validate(modl.validate), modl.handler);
    default:
      return router.get(modl.route, validate(modl.validate), modl.handler);
  }
});

export { moduleRoutes, router as MasterRouter };
