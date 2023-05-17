import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserProfile } from "../../typeorm/entity/UserProfile";
import { StatusCodes } from "http-status-codes";

class UserProfileController {
  async signup(request: Request, response: Response) {
    try {
      return response
        .status(StatusCodes.OK)
        .send({ status: true, data: "userDetails" });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: true, message: error.message });
    }
  }

  async login(request: Request, response: Response) {
    try {
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }

  async getUserDetails(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const userDetails = await getRepository(UserProfile).findOneOrFail({
        where: {
          id,
        },
      });
      return response
        .status(StatusCodes.OK)
        .send({ status: true, data: userDetails });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }
}

export const userProfileController = new UserProfileController();
