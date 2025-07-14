// import { NextFunction, Response, Request } from "express";
// import { ZodSchema, ZodError } from "zod";
// import ApiError from "../lib/ApiError";

// type SchemaGroup = {
//   body?: ZodSchema;
//   query?: ZodSchema;
//   params?: ZodSchema;
// };

// const zodValidate = (schema: SchemaGroup) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     console.log("Validating request with schema:", schema);
//     console.log(
//       "Validating request with body:",
//       req.method,
//       req.path,
//       req.body
//     );

//     try {
//       console.log("Validating request with schema:", req.body);

//       if (schema.body) {
//         const result = schema.body.safeParse(req.body);
//         if (!result.success) {
//           const error = result.error as ZodError;
//           const msg = `${error.errors[0]?.message || "Invalid request body"}`;
//           return next(new ApiError(400, msg));
//         }
//       }

//       if (schema.query) {
//         const result = schema.query.safeParse(req.query);
//         if (!result.success) {
//           const error = result.error as ZodError;
//           const msg = `${error.errors[0]?.message || "Invalid query params"}`;
//           return next(new ApiError(400, msg));
//         }
//       }

//       if (schema.params) {
//         const result = schema.params.safeParse(req.params);
//         if (!result.success) {
//           const error = result.error as ZodError;
//           const msg = `${error.errors[0]?.message || "Invalid route params"}`;
//           return next(new ApiError(400, msg));
//         }
//       }

//       next();
//     } catch (err) {
//       next(new ApiError(400, "Invalid request"));
//     }
//   };
// };

// export default zodValidate;

// middleware/zodValidate.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import ApiError from "../lib/ApiError";

type SchemaGroup = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

const zodValidate = (schema: SchemaGroup) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(
      "Validating request with schema:",
      req.method,
      req.path,
      req.body
    );

    try {
      if (schema.body) {
        const result = schema.body.safeParse(req.body);
        if (!result.success) {
          const error = result.error as ZodError;
          return next(new ApiError(400, error.errors[0]?.message));
        }
      }

      if (schema.query) {
        const result = schema.query.safeParse(req.query);
        if (!result.success) {
          const error = result.error as ZodError;
          return next(new ApiError(400, error.errors[0]?.message));
        }
      }

      if (schema.params) {
        const result = schema.params.safeParse(req.params);
        if (!result.success) {
          const error = result.error as ZodError;
          return next(new ApiError(400, error.errors[0]?.message));
        }
      }

      next();
    } catch (err) {
      next(new ApiError(400, "Invalid request"));
    }
  };
};

export default zodValidate;
