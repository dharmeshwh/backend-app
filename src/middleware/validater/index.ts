import { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import { StatusCodes } from "http-status-codes";

const validate = (schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const submitData = { ...req.body };
      await schema.validateAsync(submitData);
      next();
    } catch (err: any) {
      if (err && err.details && err.details[0] && err.details[0].message) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          responseCode: "000099",
          responseMessage: err.message,
          status: "Fail",
        });
      }
      return err;
    }
  };
};

const validateParamData = (dataKey: string[]) =>
  dataKey.map((key) => param(key, `${key} is required`).exists());

export { validate, validateParamData };
