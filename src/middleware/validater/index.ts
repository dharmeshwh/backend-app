import { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import { StatusCodes } from "http-status-codes";

const validate = (schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateData = { ...req.body };
      await schema.validateAsync(validateData);
      next();
    } catch (error: Error | any) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: error.message,
      });
    }
  };
};

const validateParamData = (dataKey: string[]) =>
  dataKey.map((key) => param(key, `${key} is required`).exists());

export { validate, validateParamData };
