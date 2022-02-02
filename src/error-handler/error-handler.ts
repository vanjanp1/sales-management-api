import { Request, Response, NextFunction } from "express";
import { ValidateError } from "tsoa";
import { ErrorCode } from "./error-code";
import { ErrorException } from "./error-exception";
import { ErrorModel } from "./error-model";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.log("Error handling middleware called.");
  console.log("Path:", req.path);
  console.error("Error occured:", err);
  if (err instanceof ErrorException) {
    console.log("Error is known.");
    res.status(err.status).send(err);
  } else if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    res
      .status(500)
      .json({
        code: ErrorCode.UnknownError,
        status: 500,
        metaData: { message: "Validation Failed", details: err?.fields },
      } as ErrorModel);
  } else {
    // For unhandled errors.
    res
      .status(500)
      .send({ code: ErrorCode.UnknownError, status: 500 } as ErrorModel);
  }
};
