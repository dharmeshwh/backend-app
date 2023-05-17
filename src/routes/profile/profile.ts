import { Router } from "express";
import { validate, validateParamData } from "../../middleware/validater";
import { loginContract, signupContract } from "./contract";
import { userProfileController } from "../../controller/profile";

const profileRoute = Router();

profileRoute.post(
  "/signup",
  validate(signupContract),
  userProfileController.signup
);

profileRoute.post(
  "/login",
  validate(loginContract),
  userProfileController.login
);

profileRoute.get(
  "/user-details/:id",
  validateParamData(["id"]),
  userProfileController.getUserDetails
);

export = profileRoute;
