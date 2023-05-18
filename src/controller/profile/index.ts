import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserProfile } from "../../typeorm/entity/UserProfile";
import { StatusCodes } from "http-status-codes";

class ProfileController {
  async getUserDetails(request: Request, response: Response) {
    try {
      // Retrieving the userId and username from the request, which were saved during the validation process in the validateRoute middleware.
      const { userId, username } = request[`user`];

      // Retrieve the user details from the database based on the user ID and username
      const userDetails = await getRepository(UserProfile).findOneOrFail({
        where: {
          id: userId,
          username,
        },
      });

      // Return the success response with the user details
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
