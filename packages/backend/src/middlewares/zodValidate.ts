import { NextFunction, Response, Request } from "express";
import { ZodSchema } from "zod";
import ApiError from "../lib/ApiError";

type SchemaGroup = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

const zodValidate =
  (schema: SchemaGroup) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) schema.body.parse(req.body);
      if (schema.query) schema.query.parse(req.query);
      if (schema.params) schema.params.parse(req.params);
      next();
    } catch (err: any) {
      const message = err.errors?.[0]?.message || "Invalid request data";
      next(new ApiError(400, message));
    }
  };
export default zodValidate;
