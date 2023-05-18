import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

const validatePassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let { password } = request.body;
    request.body.password = await bcrypt.hash(password, 10);
    next();
  } catch (error: Error | any) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: false, message: error.message });
  }
};

export { validatePassword };
