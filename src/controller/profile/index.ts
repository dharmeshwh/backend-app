import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserProfile } from "../../typeorm/entity/UserProfile";
import { StatusCodes } from "http-status-codes";

class ProfileController {
  async getUserDetails(request: Request, response: Response) {
    try {
      const { userId, username } = request[`user`];

      const userDetails = await getRepository(UserProfile).findOneOrFail({
        where: {
          id: userId,
          username,
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

export const profileController = new ProfileController();
