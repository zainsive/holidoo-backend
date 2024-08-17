import { ZodSchema } from "zod";
import { ValidationSource } from "../constants";

export type validationType = {
  source: ValidationSource;
  schema: ZodSchema;
};
