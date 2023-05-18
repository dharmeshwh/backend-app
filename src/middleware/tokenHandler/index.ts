import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { IVerifyTokenResponse } from "../../utils/constant";

const verifyToken = async (token): Promise<IVerifyTokenResponse | null> => {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_SECRET) {
      throw new Error(`No JWT_SECRET exists`);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const validateRoute = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const jwtToken = request.get("token");
    const userCreds = await verifyToken(jwtToken);

    request[`user`] = {
      userId: userCreds?.userId,
      username: userCreds?.userName,
    };

    next();
  } catch (error: Error | any) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .send({ status: false, message: error.message });
  }
};

export { validateRoute };
