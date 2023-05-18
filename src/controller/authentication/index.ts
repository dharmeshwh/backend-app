import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { UserProfile } from "../../typeorm/entity/UserProfile";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import CustomValidation from "../../utils/customValidation";

class AuthController {
  async signup(request: Request, response: Response) {
    try {
      const { firstName, lastName, email, password, username } = request.body;

      const user = new UserProfile();
      user.firstname = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.username = username;

      const userDetails = await getRepository(UserProfile).save(user);

      return response
        .status(StatusCodes.OK)
        .send({ status: true, data: userDetails });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: true, message: error.message });
    }
  }

  async login(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      const user = await getRepository(UserProfile).findOneOrFail({
        where: {
          username,
        },
        select: ["password", "username", "id"],
      });

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid || !user) {
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ status: false, message: "username or password in invalid!" });
      }

      const token = CustomValidation.getJwtToken(user.username, user.id);

      return response.status(StatusCodes.OK).send({ status: true, token });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }
}

export const authController = new AuthController();
